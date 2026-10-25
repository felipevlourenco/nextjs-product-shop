export const createQueryParam = <T extends object>(params: T) => {
    const newParams = new URLSearchParams();

    Object.entries(params).forEach(([paramKey, value]) => {
        if (value === undefined || value === null || value === '') {
            return;
        }

        newParams.set(paramKey, String(value));
    });

    return newParams;
};
