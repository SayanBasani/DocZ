export type UpdateProfileInput = {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    timezone: string;
};

export type ValidationResult = {
    success: boolean;
    message?: string;
};

export function validateProfile(data: UpdateProfileInput): ValidationResult {

    if (data.firstName.length > 50) {
        return {
            success: false,
            message: "First name cannot exceed 50 characters.",
        };
    }

    if (data.lastName.length > 50) {
        return {
            success: false,
            message: "Last name cannot exceed 50 characters.",
        };
    }

    if (data.phone.length > 20) {
        return {
            success: false,
            message: "Phone number is invalid.",
        };
    }

    if (data.country.length > 100) {
        return {
            success: false,
            message: "Country name is too long.",
        };
    }

    if (data.state.length > 100) {
        return {
            success: false,
            message: "State name is too long.",
        };
    }

    if (data.city.length > 100) {
        return {
            success: false,
            message: "City name is too long.",
        };
    }

    if (data.timezone.length > 100) {
        return {
            success: false,
            message: "Timezone is invalid.",
        };
    }

    return {
        success: true,
    };
}