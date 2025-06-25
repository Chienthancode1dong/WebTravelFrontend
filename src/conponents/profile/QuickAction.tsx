const QuickAction = () => {
    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thao Tác Nhanh</h3>
                <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                        <div className="font-medium text-gray-800">Đặt phòng mới</div>
                        <div className="text-sm text-gray-600">Tìm và đặt khách sạn</div>
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <div className="font-medium text-gray-800">Lịch sử đặt phòng</div>
                        <div className="text-sm text-gray-600">Xem các đặt phòng trước đó</div>
                    </button>
                    <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                        <div className="font-medium text-gray-800">Yêu thích</div>
                        <div className="text-sm text-gray-600">Danh sách khách sạn yêu thích</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default QuickAction;