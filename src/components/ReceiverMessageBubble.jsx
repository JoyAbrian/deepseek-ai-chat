function ReceiverMessageBubble({ message }) {
    return (
        <div className="flex items-center gap-2">
            <img src="/bot.png" className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="bg-white text-gray-800 p-3 rounded-lg max-w-[70%] shadow">
                {message}
            </div>
        </div>
    );
}

export default ReceiverMessageBubble;