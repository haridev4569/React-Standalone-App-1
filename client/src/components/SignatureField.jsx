import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureField = ({ onSave }) => {

    const [signature, setSignature] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleSave = () => {
        if (canvasRef.current.isEmpty()) {
            alert('Please provide a signature first.');
            return;
        }
        const signatureDataUrl = canvasRef.current.toDataURL('image/png');
        setSignature(signatureDataUrl);
        if (onSave) {
            onSave(signatureDataUrl);
        }
    };

    const handleClear = () => {
        canvasRef.current.clear();
        setSignature(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const signatureDataUrl = reader.result;
                setIsUploaded(true);
                setSignature(signatureDataUrl);
                if (onSave) {
                    onSave(signatureDataUrl);
                }
            };
        }
    };

    return (
        <div className='w-full'>
            {!isUploaded && (
                <div>
                    <p className='text-md text-gray-600'>Sign Here</p>
                    <div>
                        <SignatureCanvas
                            ref={canvasRef}
                            penColor='black'

                        />
                    </div>
                </div>)}
            <div className='flex gap-4'>


                <button onClick={handleSave} type='button' className='bg-gray-200 text-black px-5 py-2 rounded-md text-xs font-semibold hover:bg-gray-300 transition ease-in-out duration-300'>Save</button>
                <button onClick={handleClear} type='button' className='bg-gray-200 text-black px-5 py-2 rounded-md text-xs font-semibold hover:bg-gray-300 transition ease-in-out duration-300'>Clear</button>
                <button type="button" onClick={triggerFileUpload} className='bg-gray-200 text-black px-5 py-2 rounded-md text-xs font-semibold hover:bg-gray-300 transition ease-in-out duration-300'>Upload Image</button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className='hidden'
                />

            </div>
            {signature && (
                <div>
                    <h4>Preview:</h4>
                    <img src={signature} alt="User signature" style={{ border: '1px solid black', maxWidth: '300px', maxHeight: '150px' }} />
                </div>
            )}
        </div>
    )
}

export default SignatureField