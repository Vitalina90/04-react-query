import css from './ErrorMessage.module.css';
import type { ReactElement } from 'react';

export default function ErrorMessage(): ReactElement {
    return (
        <p className={css.text}
            role='alert'
        >
            There was an error, please try again...</p>
    );
}

