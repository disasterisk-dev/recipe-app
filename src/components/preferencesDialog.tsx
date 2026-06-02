import { authService } from "@/lib/services/authService"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { FieldGroup, Field } from "./ui/field"
import { Button } from "./ui/button"
import { ButtonGroup } from "./ui/button-group"
import { Label } from "./ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add, Minus } from "@hugeicons/core-free-icons"
import { Input } from "./ui/input"
import { userService } from "@/lib/services/userService"
import { useForm } from "@tanstack/react-form"

const PreferencedDialog = () => {
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: { breakfast: 7, lunch: 7, dinner: 7 },
    onSubmit: async ({ value }) => {
      setServerError(null)
      try {
        await userService.updatePrefs(authService.getCurrentUser()!.uid, {
          breakfastCount: value.breakfast,
          lunchCount: value.lunch,
          dinnerCount: value.dinner,
        })
      } catch (err: unknown) {
        setServerError(
          err instanceof Error ? err.message : "Failed to save preferences"
        )
      }
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Set Preferences</Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <DialogHeader>
            <DialogTitle>Preferences</DialogTitle>
            <DialogDescription>
              Tell us how many of each meal type you want to plan per week. You
              don't need to assign meals to a specific day! Recipeat is all
              about fitting your menu to your schedule.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <form.Field
              name="breakfast"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <PreferenceInput
                    field={field}
                    isInvalid={isInvalid}
                    label="Breakfasts per Week"
                  />
                )
              }}
            />
            <form.Field
              name="lunch"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <PreferenceInput
                    field={field}
                    isInvalid={isInvalid}
                    label="Lunches per Week"
                  />
                )
              }}
            />
            <form.Field
              name="dinner"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <PreferenceInput
                    field={field}
                    isInvalid={isInvalid}
                    label="Dinners per Week"
                  />
                )
              }}
            />
          </FieldGroup>
          <DialogClose asChild>
            <Button type="submit">Save</Button>
          </DialogClose>
          {serverError && <span>{serverError}</span>}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PreferencedDialog

interface InputProps {
  field: any
  isInvalid: boolean
  label: string
}

const PreferenceInput = (props: InputProps) => {
  return (
    <>
      <Field>
        <Label>{props.label}</Label>
        <ButtonGroup>
          <Button
            type="button"
            variant={"secondary"}
            onClick={(_) => {
              if (props.field.state.value == 0) return
              props.field.handleChange(props.field.state.value - 1)
            }}
          >
            <HugeiconsIcon icon={Minus} />{" "}
          </Button>
          <Input
            id={props.field.name}
            name={props.field.name}
            value={props.field.state.value}
            onBlur={props.field.handleBlur}
            onChange={(e) => {
              let result = Number.parseInt(e.target.value)
              if (result.toString() == "NaN" || result < 0) result = 0
              props.field.handleChange(result)
            }}
            aria-invalid={props.isInvalid}
            placeholder="Login button not working on mobile"
            autoComplete="off"
            className="text-center"
          />
          <Button
            type="button"
            variant={"secondary"}
            onClick={(_) => {
              if (props.field.state.value == 7) return
              props.field.handleChange(props.field.state.value + 1)
            }}
          >
            <HugeiconsIcon icon={Add} />{" "}
          </Button>
        </ButtonGroup>
      </Field>
    </>
  )
}
