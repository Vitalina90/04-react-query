import css from './Loader.module.css';
import { type ReactElement, type CSSProperties } from 'react';
import { RingLoader } from 'react-spinners'
  
export default function Loader(): ReactElement {
    const loading = true;
    const color = '#0000FF';

    const override: CSSProperties = {
        display: 'block',
        margin: '0 auto',
        borderColor: color,
    };

    return (
        <p className={css.text}
            role='status'
            aria-busy='true'
        >
            <RingLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label='Loading Spinner'
        data-testid='loader'
            />
            Loading movies, please wait...
        </p>
    );
}
