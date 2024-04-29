import type { Lang, PageProps } from "@/types"
import CoreLayout from "@/layouts/core-layout.tsx"
import DeleteUserForm from "./partials/delete-user-form.tsx"
import UpdatePasswordForm from "./partials/update-password-form.tsx"
import UpdateProfileInformationForm from "./partials/update-profile-information-form.tsx"

export default function Edit({
  mustVerifyEmail,
  status,
  lang,
}: PageProps<{ mustVerifyEmail: boolean; status?: string; lang: Lang }>) {
  return (
    <CoreLayout title="Profile Edit">
      <div className="py-12">
        <div className="mx-auto max-w-2xl space-y-6 px-4 sm:px-6 lg:px-8">
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            lang={lang}
            className="w-full"
          />
          <UpdatePasswordForm className="w-full" lang={lang} />
          <DeleteUserForm className="w-full" lang={lang} />
        </div>
      </div>
    </CoreLayout>
  )
}
