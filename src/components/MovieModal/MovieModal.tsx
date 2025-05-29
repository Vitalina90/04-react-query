import css from './MovieModal.module.css';
import { useEffect, useRef } from 'react';
import type { Movie } from '../../types/movie';
import { createPortal } from 'react-dom';
import { imgURL } from '../../services/movieService';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    const { title, overview, backdrop_path, release_date, vote_average } = movie;
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        closeButtonRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // const imageSrc = backdrop_path ? `${imgURL}${backdrop_path}` : 'https://via.placeholder.com/500x281.png?text=No+Image';

    return createPortal(
        <div
            className={css.backdrop}
            role='dialog'
            aria-modal='true'
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                <button
                    className={css.closeButton}
                    aria-label='Close modal'
                    onClick={onClose}
                >
                    &times;
                </button>
                <img
                    src={`${imgURL}${backdrop_path}`}
                    alt={title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <p>
                        <strong>Release Date:</strong> {release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {vote_average}/10
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}


