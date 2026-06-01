import { createFileRoute } from "@tanstack/react-router"
// import { useForm } from "@tanstack/react-form"
// import { authService } from "@/lib/services/authService"
import { LoginForm } from "@/components/login-form"

export const Route = createFileRoute("/login/")({
  component: LoginPage,
})

function LoginPage() {
  // const navigate = useNavigate()

  // const form = useForm({
  //   defaultValues: { email: "", password: "" },
  //   onSubmit: async ({ value }) => {
  //     await authService.signIn(value.email, value.password)
  //     navigate({ to: "/" })
  //   },
  // })

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
