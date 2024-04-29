<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('index', absolute: false))
                    : Inertia::render('auth/verify-email', [
                        'status' => session('status'),
                        'lang' => [
                            'verify_email_address' => __('Verify Email Address'),
                            'thank_you_verify_email' => __("Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."),
                            'notification' => __('Notification'),
                            'new_verification_email_send' => __('A new verification link has been sent to the email address you provided during registration.'),
                            'resend_verification_email' => __('Resend Verification Email'),
                            'logout' => __('Logout'),
                        ],
                    ]);
    }
}
