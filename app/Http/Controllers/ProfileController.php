<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('profile/edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'lang' => [
                'profile_information' => __('Profile Information'),
                'update_password' => __('Update Password'),
                'delete_account' => __('Delete Account'),
                'profile_information_description' => __("Update your account's profile information and email address."),
                'update_password_description' => __('Ensure your account is using a long, random password to stay secure.'),
                'delete_account_description' => __('Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.'),
                'email_unverified' => __('Your email address is unverified.'),
                'resend_verification_email' => __('Click here to re-send the verification email.'),
                'resend_verification_email_sent' => __('A new verification link has been sent to your email address.'),
                'name' => __('Name'),
                'email' => __('Email'),
                'password' => __('Password'),
                'current_password' => __('Current Password'),
                'new_password' => __('New Password'),
                'confirm_password' => __('Confirm Password'),
                'save' => __('Save'),
                'saved' => __('Saved.'),
                'delete_account_alert_title' => __('Are you sure you want to delete your account?'),
                'delete_account_alert_description' => __('Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.'),
                'cancel' => __('Cancel'),
                'notification' => __('Notification'),
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
