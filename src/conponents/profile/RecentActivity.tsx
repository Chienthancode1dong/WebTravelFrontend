const RecentActivity = () => {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
                <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Đã đặt phòng tại Khách sạn Mường Thanh</span>
                        <span className="text-sm text-gray-500 ml-auto">2 ngày trước</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Hoàn thành chuyến đi Đà Nẵng</span>
                        <span className="text-sm text-gray-500 ml-auto">1 tuần trước</span>
                    </div>
                    <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Đánh giá 5 sao cho Resort Phú Quốc</span>
                        <span className="text-sm text-gray-500 ml-auto">2 tuần trước</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentActivity;