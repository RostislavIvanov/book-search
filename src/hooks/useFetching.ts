import { useState } from "react";

type UseFetchingCallback = () => Promise<void>;

interface UseFetchingResult {
    fetching: () => void;
    isLoading: boolean;
    error: string;
}

export const useFetching = (callback: UseFetchingCallback): UseFetchingResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message + '. Не удалось загрузить данные');
            } else {
                setError("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fetching,
        isLoading,
        error,
    };
};
