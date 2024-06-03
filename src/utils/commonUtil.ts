export const isClient = () => typeof window !== "undefined";

export const isServer = () => typeof window === "undefined";

export const getWindow = () => isClient() && window;

export const productImageURL = (image?: string): string => {
    return `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${image}`;
};