type FormValidatorOption = {
    type: "checkbox" | "custom_required";
    allowed_from?: { el: HTMLElement[]; number_of_allowed: number }[];
    func?: ((element: HTMLElement) => boolean) | null;
};

/**
 * Validate your forms at ease. No need to perform hard coded stuffs.
 * @param {HTMLElement} [form] - HTML form element
 * @param {boolean} [isRequiredAll=false] - Set required to all inputs. Only input with type date, datetime-local, email, file, image, number, password, tel, text, time, url, week, hidden will be set as required
 * @param {HTMLElement[]} [requiredNone=[]] - Elements in this array will not be set as required
 * @param {object[]} [option=[{...}, {...}]] - Any optional values can be passed here.
 * If you want to use your own custom required message like pop ups. Just create a function for it and pass in the object. Full implementation is displayed on the npmjs page
 * @see https://www.npmjs.com/package/codereducer Visit here for more detailed information about the options
 */

declare class FormValidator {
    constructor(
        form: HTMLElement,
        isRequiredAll?: boolean,
        requiredNone?: HTMLElement[],
        option?: FormValidatorOption[]
    );

    /**
     * Use this method t validate your form properly and check in console for any errors while development.
     * @param {CallableFunction} [success] - This function triggers only when the form validation pass
     */
    validate(success: () => void): void;
    /**
     * It cleans up the stuffs for frameworks
     */
    revert(): void;
}



export = FormValidator