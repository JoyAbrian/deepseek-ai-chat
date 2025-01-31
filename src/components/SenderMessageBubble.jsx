function SenderMessageBubble({ message }) {
    return (
        <div className="flex justify-end items-center gap-2">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[70%] shadow">
                {message}
            </div>
            <img src="/person.png" className="w-10 h-10 bg-gray-300 rounded-full" />
        </div>
    );
}

export default SenderMessageBubble;