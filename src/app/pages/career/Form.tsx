"use client";

import { useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/app/components/Button/Button";
import { Checkbox } from "@/app/components/Input/Checkbox/Checkbox";
import { TextInput } from "@/app/components/Input/TextInput";
import { ModalSubmit } from "@/app/components/Modal/ModalSubmit";
import { Textarea } from "@/app/components/Textarea/Textarea";

import { useText } from "@/app/context/TextDataContext";

import { saveDataToLocalStorage, isObjectEmpty} from "@/app/helpers";

import { FormFields, FormFieldsData } from "@/app/types/formTypes";

export function Form() {
	const textData = useText();

	const formList = textData.career.form.formList;
	const field = textData.career.form.fields;
	const required = textData.career.form.required;
	const button = textData.career.form.button;
	const modal = textData.career.form.modal;

	// const savedFormData = loadDataFromLocalStorage("formDataCareer");

	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormFields>({
		mode: "onChange",
		defaultValues:
			// savedFormData ||
			{
				fullName: "",
				email: "",
				phone: "",
				position: "",
				message: "",
				consent: false,
			},
	});

	const watchConsent = watch("consent");
	const watchFullName = watch("fullName");
	const watchEmail = watch("email");
	const watchPosition = watch("position");
	const watchPhone = watch("phone");

	const isValidFixed = isObjectEmpty(errors);

	const formFieldsData: FormFieldsData = useMemo(
		() => ({
			fullName: {
				type: field.fullName.type,
				inputMode: field.fullName.inputMode,
				name: field.fullName.name,
				label: field.fullName.label,
				placeholder: field.fullName.placeholder,
				required: true,
				register: () =>
					register(field.fullName.name, {
						required: required,
						pattern: {
							value: new RegExp(field.fullName.pattern),
							message: field.fullName.message,
						},
					}),
			},
			email: {
				type: field.email.type,
				inputMode: field.email.inputMode,
				name: field.email.name,
				label: field.email.label,
				placeholder: field.email.placeholder,
				required: true,
				register: () =>
					register(field.email.name, {
						required: required,
						pattern: {
							value: new RegExp(field.email.pattern),
							message: field.email.message,
						},
					}),
			},
			phone: {
				type: field.phone.type,
				inputMode: field.phone.inputMode,
				name: field.phone.name,
				label: field.phone.label,
				placeholder: field.phone.placeholder,
				required: true,
				register: () =>
					register(field.phone.name, {
						required: required,
						pattern: {
							value: new RegExp(field.phone.pattern),
							message: field.phone.message,
						},
					}),
			},
			position: {
				type: field.position.type,
				inputMode: field.position.inputMode,
				name: field.position.name,
				label: field.position.label,
				placeholder: field.position.placeholder,
				required: true,
				register: () =>
					register(field.position.name, {
						required: required,
						pattern: {
							value: new RegExp(field.position.pattern),
							message: field.position.message,
						},
					}),
			},
			message: {
				type: field.message.type,
				inputMode: field.message.inputMode,
				name: field.message.name,
				label: field.message.label,
				placeholder: field.message.placeholder,
				required: true,
				register: () =>
					register(field.message.name, {
						pattern: {
							value: new RegExp(field.message.pattern),
							message: field.message.message,
						},
					}),
			},
			consent: {
				type: field.consent.type,
				name: field.consent.name,
				placeholder: field.consent.placeholder,
				required: true,
				register: () =>
					register(field.consent.name, {
						required: true,
					}),
				text: field.consent.text,
			},
		}),
		[register]
	);

	const [open, setOpen] = useState(false);
	const onOpenMenu = () => {
		setOpen(true);
	};
	const onCloseMenu = () => {
		setOpen(false);
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		saveDataToLocalStorage("formDataCareer", data);
		console.log(data);
		onOpenMenu();
		reset();
	};

	return (
		<form
			className="flex flex-col gap-[16px] xl:gap-[24px] xl:w-[605px] justify-center items-center relative"
			onSubmit={handleSubmit(onSubmit)}
		>
			{formList.map((field: string) => {
				if (!formFieldsData[field]) return null;

				switch (formFieldsData[field].type) {
					case "text":
						return (
							<TextInput
								key={field}
								inputMode={formFieldsData[field].inputMode}
								label={formFieldsData[field].label}
								register={formFieldsData[field].register()}
								errors={errors}
								required={formFieldsData[field].required}
								disabled={formFieldsData[field].disabled}
								placeholder={formFieldsData[field].placeholder}
								className={`self-start ${
									formFieldsData[field].name === "phone"
										? "placeholder:first-line:text-white"
										: ""
								}`}
							/>
						);
					case "message":
						return (
							<Textarea
								section="career"
								key={field}
								inputMode={formFieldsData[field].inputMode}
								label={formFieldsData[field].label}
								register={formFieldsData[field].register()}
								errors={errors}
								disabled={formFieldsData[field].disabled}
								className="self-start"
							/>
						);

					case "checkbox":
						return (
							<Checkbox
								key={field}
								label={formFieldsData[field].label}
								register={formFieldsData[field].register()}
								errors={errors}
								required={formFieldsData[field].required}
								disabled={formFieldsData[field].disabled}
								className="self-start"
								text={formFieldsData[field].text || ""}
							/>
						);
				}
			})}
			<Button
				type="submit"
				submit
				disabled={
					!watchConsent ||
					!watchEmail ||
					!watchFullName ||
					!watchPhone ||
					!watchPosition ||
					!isValidFixed
				}
				className="pt-[30px] md:pt-0 md:absolute md:right-0 md:bottom-[-30px] xl:bottom-[-12px]"
			>
				{button}
			</Button>
			{open && (
				<ModalSubmit isOpen={open} text={modal} onCloseMenu={onCloseMenu} />
			)}
		</form>
	);
}
