export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Email Confirmation</h1>
        <p className="text-muted-foreground mt-2">Please check your email to confirm your account.</p>
      </div>
    </div>
  )
}

export const dynamic = 'force-static'