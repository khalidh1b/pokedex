export const PokemonNotFound = () => {
    return (
        <div className="flex justify-center items-center">
        <div className="mx-auto w-1/2 flex flex-col items-center text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">
                <circle cx="64" cy="64" r="27.7022" fill="#212121" fillOpacity="0.16"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M127.465 55.6893C123.391 24.2694 96.5298 0 64 0C31.4702 0 4.60883 24.2694 0.534677 55.6893H23.9033C27.7439 37.0628 44.2368 23.0588 64.0005 23.0588C83.7642 23.0588 100.257 37.0628 104.098 55.6893H127.465ZM127.465 72.3106H104.098C100.257 90.9371 83.7642 104.941 64.0005 104.941C44.2368 104.941 27.7438 90.9371 23.9033 72.3106H0.534668C4.60879 103.731 31.4702 128 64 128C96.5298 128 123.391 103.731 127.465 72.3106Z" fill="#FF5858"/>
            </svg>
            <h3 className="mt-4 dark:text-white text-lg font-medium">No Pokémon matched your search!</h3>
        </div>
    </div>
    )
};
