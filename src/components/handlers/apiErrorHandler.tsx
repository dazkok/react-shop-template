export const handleApiError = (error: any, setFormErrors?: (errors: any) => void) => {
    if (error.response) {
        const { data } = error.response;

        if (data.errors && setFormErrors) {
            // Obsługa błędów walidacji
            setFormErrors(data.errors);
        } else if (data.error || data.message) {
            // Obsługa błędu serwera
            console.error('Server error:', data.error || data.message);
            alert('Wystąpił błąd serwera. Spróbuj ponownie później.');
        } else {
            console.error('Unexpected response:', data);
        }
    } else {
        // Obsługa błędów sieciowych
        console.error('Network error:', error);
        alert('Brak połączenia z serwerem. Sprawdź swoje połączenie internetowe.');
    }
};