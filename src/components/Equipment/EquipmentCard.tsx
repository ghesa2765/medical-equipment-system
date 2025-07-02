'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ClockIcon, 
  MapPinIcon, 
  StarIcon,
  HeartIcon,
  ShareIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid'
import { useState } from 'react'

interface Equipment {
  equipment_id: number
  equipment_code: string
  equipment_name: string
  description?: string
  brand_model?: string
  status: 'available' | 'in_use' | 'maintenance'
  location?: string
  max_borrow_days: number
  category?: string
  rating?: number
  borrowCount?: number
}

interface EquipmentCardProps {
  equipment: Equipment
  onBook: (equipment: Equipment) => void
}

export default function EquipmentCard({ equipment, onBook }: EquipmentCardProps) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  
  const isAvailable = equipment.status === 'available'
  
  const statusConfig = {
    available: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      text: 'พร้อมใช้งาน',
      icon: '✅',
      dot: 'bg-emerald-500'
    },
    in_use: {
      badge: 'bg-amber-100 text-amber-800 border-amber-200', 
      text: 'กำลังใช้งาน',
      icon: '🔴',
      dot: 'bg-amber-500'
    },
    maintenance: {
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      text: 'ซ่อมบำรุง',
      icon: '🔧',
      dot: 'bg-blue-500'
    }
  }

  const status = statusConfig[equipment.status]

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'การวัดสัญญาณชีพ': return '💗'
      case 'การตรวจวิเคราะห์': return '🔬'
      case 'การตรวจร่างกาย': return '🩺'
      default: return '🏥'
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'การวัดสัญญาณชีพ': return 'from-pink-50 to-red-100 border-pink-200'
      case 'การตรวจวิเคราะห์': return 'from-blue-50 to-cyan-100 border-blue-200'
      case 'การตรวจร่างกาย': return 'from-emerald-50 to-green-100 border-emerald-200'
      default: return 'from-gray-50 to-gray-100 border-gray-200'
    }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation() // ป้องกันไม่ให้เปิดหน้ารายละเอียด
    setIsSharing(true)
    setTimeout(() => setIsSharing(false), 1000)
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: equipment.equipment_name,
          text: `ตรวจสอบอุปกรณ์: ${equipment.equipment_name} (${equipment.equipment_code}) - RSU Medical Clinic`,
          url: `${window.location.origin}/equipment/${equipment.equipment_id}`
        })
      } catch (error) {
        console.log('การแชร์ถูกยกเลิก')
      }
    } else {
      navigator.clipboard.writeText(`${equipment.equipment_name} (${equipment.equipment_code}) - RSU Medical Clinic - ${window.location.origin}/equipment/${equipment.equipment_id}`)
      alert('ลิงก์ถูกคัดลอกแล้ว!')
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // ป้องกันไม่ให้เปิดหน้ารายละเอียด
    setIsFavorited(!isFavorited)
  }

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation() // ป้องกันไม่ให้เปิดหน้ารายละเอียด
    if (isAvailable) {
      onBook(equipment)
    }
  }

  const handleCardClick = () => {
    // นำทางไปหน้ารายละเอียดอุปกรณ์
    router.push(`/equipment/${equipment.equipment_id}`)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-amber-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* Background Gradient Based on Category */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(equipment.category)} opacity-30`}></div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${status.badge}`}>
              <div className={`w-2 h-2 ${status.dot} rounded-full mr-2 animate-pulse`}></div>
              {status.text}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="p-1.5 rounded-full hover:bg-white/80 transition-colors z-10"
            >
              {isFavorited ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
              )}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              disabled={isSharing}
              className="p-1.5 rounded-full hover:bg-white/80 transition-colors z-10"
            >
              <ShareIcon className={`h-5 w-5 ${isSharing ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'}`} />
            </motion.button>
          </div>
        </div>

        {/* Equipment Code Badge */}
        <div className="absolute top-4 right-4 bg-emerald-100/80 backdrop-blur-sm text-emerald-800 text-xs font-mono px-2 py-1 rounded-lg border border-emerald-200 z-10">
          {equipment.equipment_code}
        </div>

        {/* Category Badge */}
        {equipment.category && (
          <div className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-medium mb-3 bg-gradient-to-r ${getCategoryColor(equipment.category)} border`}>
            <span className="mr-1">{getCategoryIcon(equipment.category)}</span>
            {equipment.category}
          </div>
        )}

        {/* Equipment Info */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">
          {equipment.equipment_name}
        </h3>
        
        {equipment.brand_model && (
          <p className="text-gray-600 mb-2 text-sm font-medium flex items-center">
            <span className="mr-2">📱</span>
            {equipment.brand_model}
          </p>
        )}
        
        {equipment.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
            {equipment.description}
          </p>
        )}

        {/* Rating and Stats */}
        {equipment.rating && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(equipment.rating)}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {equipment.rating.toFixed(1)}
              </span>
            </div>
            
            {equipment.borrowCount && (
              <div className="flex items-center text-xs text-gray-500">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                ยืม {equipment.borrowCount} ครั้ง
              </div>
            )}
          </div>
        )}

        {/* Details */}
        <div className="flex items-center justify-between mb-6 text-sm">
          {equipment.location && (
            <div className="flex items-center text-gray-500">
              <MapPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="truncate">{equipment.location}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-500">
            <ClockIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span className="whitespace-nowrap">{equipment.max_borrow_days} วัน</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button 
          whileHover={{ scale: isAvailable ? 1.02 : 1 }}
          whileTap={{ scale: isAvailable ? 0.98 : 1 }}
          disabled={!isAvailable}
          onClick={handleBooking}
          className={`
            w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 border
            ${isAvailable
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-transparent'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
            }
          `}
        >
          {isAvailable ? (
            <>
              <span>📋</span>
              <span>จองอุปกรณ์</span>
            </>
          ) : (
            <>
              <span>⏳</span>
              <span>ไม่ว่าง</span>
            </>
          )}
        </motion.button>

        {/* Click to view details hint */}
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-400 group-hover:text-emerald-600 transition-colors">
            👆 คลิกเพื่อดูรายละเอียดเพิ่มเติม
          </span>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      </div>

      {/* Availability Indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full ${isAvailable ? 'bg-gradient-to-b from-emerald-400 to-green-600' : 'bg-gradient-to-b from-amber-400 to-red-500'}`}></div>
    </motion.div>
  )
}