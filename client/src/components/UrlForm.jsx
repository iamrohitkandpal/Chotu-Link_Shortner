import { useState } from "react";
import {useMutation} from "@apollo/client/react";
import {CREATE_URL_MUTATION} from "../graphql/mutations";

function UrlForm({onSuccess}) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const [createUrl, {loading}] = useMutation(CREATE_URL_MUTATION)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let finalUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            finalUrl = 'https://' + url;
        }

        try {
            await createUrl({
                variables: {input: {originalUrl: finalUrl}}
            });

            setUrl('');
            onSuccess();
        } catch (err) {
            setError(err.message || 'Failed to create short URL');
        }
    };

    return(
        <div className="url-form">
            <h3>Shorten a URL</h3>
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Enter long URL (https://example.com/...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Shorten URL'}
                </button>
            </form>
        </div>
    )
} 

export default UrlForm