import { Calendar, MapPin, Star } from "lucide-react";
// interface ProfileData {
//     name: string;
//     email: string;
//     phone: string;
//     location: string;
//     joinDate: string;
//     bio: string;
//     totalTrips: number;
//     totalBookings: number;
//     membershipLevel: string;
//     avatar?: string;
// }
// interface HistorySummaryProps {
//     profileData: ProfileData;
// }
const HistorySummary = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mx-auto max-w-4xl px-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white text-center shadow-xl border border-blue-400/20">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8" />
                    </div>
                    {/* <div className="text-3xl font-bold mb-2">{profileData.totalTrips}</div> */}
                    <div className="text-blue-100 text-sm font-medium">Chuyến đi hoàn thành</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white text-center shadow-xl border border-green-400/20">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8" />
                    </div>
                    {/* <div className="text-3xl font-bold mb-2">{profileData.totalBookings}</div> */}
                    <div className="text-green-100 text-sm font-medium">Lần đặt phòng</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white text-center shadow-xl border border-purple-400/20 sm:col-span-2 lg:col-span-1">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8" />
                    </div>
                    {/* <div className="text-3xl font-bold mb-2">{profileData.membershipLevel}</div> */}
                    <div className="text-purple-100 text-sm font-medium">Hạng thành viên</div>
                </div>
            </div>
    )
}

export default HistorySummary;