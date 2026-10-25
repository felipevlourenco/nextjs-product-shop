import { Spinner } from 'tintora';
import './loading.css';

export default function Loading() {
    return (
        <div className="loading">
            <Spinner size="large" />
        </div>
    );
}
