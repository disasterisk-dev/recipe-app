import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FieldGroup, Field } from "./ui/field";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Label } from "./ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add, Minus } from "@hugeicons/core-free-icons";
import { Input } from "./ui/input";
import { userService } from "@/lib/services";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/lib/context/authContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { UserPrefs } from "@/lib/types/user";
import { capitalizeFirstLetter } from "@/lib/utils";

const PreferencedDialog = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { user } = useAuth();

  const defaultValues: UserPrefs = {
    breakfastCount: user?.preferences?.breakfastCount ?? 7,
    lunchCount: user?.preferences?.lunchCount ?? 7,
    dinnerCount: user?.preferences?.dinnerCount ?? 7,
    startOnDay: "monday",
  };

  const form = useForm({
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await userService.updatePrefs({
          breakfastCount: value.breakfastCount,
          lunchCount: value.lunchCount,
          dinnerCount: value.dinnerCount,
          startOnDay: value.startOnDay,
        });
      } catch (err: unknown) {
        setServerError(
          err instanceof Error ? err.message : "Failed to save preferences"
        );
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Set Preferences</Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
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

          <FieldGroup className="my-4">
            <form.Field
              name="breakfastCount"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <PreferenceInput
                    field={field}
                    isInvalid={isInvalid}
                    label="Breakfasts per Week"
                  />
                );
              }}
            />
            <form.Field
              name="lunchCount"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <PreferenceInput
                    field={field}
                    isInvalid={isInvalid}
                    label="Lunches per Week"
                  />
                );
              }}
            />
            <form.Field
              name="dinnerCount"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <PreferenceInput
                    field={field}
                    isInvalid={isInvalid}
                    label="Dinners per Week"
                  />
                );
              }}
            />
            <form.Field
              name="startOnDay"
              children={(field) => (
                <Field>
                  <Label>Start Week On</Label>
                  <Select
                    onValueChange={(value) =>
                      field.handleChange(value as UserPrefs["startOnDay"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={capitalizeFirstLetter(field.state.value)}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </DialogClose>
          {serverError && <span>{serverError}</span>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencedDialog;

interface InputProps {
  field: any;
  isInvalid: boolean;
  label: string;
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
              if (props.field.state.value == 0) return;
              props.field.handleChange(props.field.state.value - 1);
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
              let result = Number.parseInt(e.target.value);
              if (result.toString() == "NaN" || result < 0) result = 0;
              props.field.handleChange(result);
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
              if (props.field.state.value == 7) return;
              props.field.handleChange(props.field.state.value + 1);
            }}
          >
            <HugeiconsIcon icon={Add} />{" "}
          </Button>
        </ButtonGroup>
      </Field>
    </>
  );
};
