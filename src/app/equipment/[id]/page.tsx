'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  PhoneIcon,
  DocumentTextIcon,
  PlayCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid'

// Mock data - ในอนาคตจะดึงจาก API
const mockEquipments = {
  1: {
    equipment_id: 1,
    equipment_code: 'BP001',
    equipment_name: 'เครื่องวัดความดันโลหิต',
    description: 'เครื่องวัดความดันโลหิตแบบดิจิทัล สำหรับตรวจสุขภาพทั่วไป พร้อมหน่วยความจำในตัว สามารถเก็บบันทึกได้ถึง 60 ครั้ง',
    brand_model: 'Omron HEM-7120',
    status: 'available' as const,
    location: 'ห้องอุปกรณ์ A - RSU Medical Clinic',
    max_borrow_days: 7,
    category: 'การวัดสัญญาณชีพ',
    rating: 4.8,
    borrowCount: 45,
    specifications: {
      'ขนาด': '10.3 × 14.6 × 6.6 ซม.',
      'น้ำหนัก': '310 กรัม',
      'ช่วงการวัด': '0-299 mmHg',
      'ความแม่นยำ': '±3 mmHg',
      'หน่วยความจำ': '60 ครั้ง',
      'แหล่งพลังงาน': 'ถ่าน AA 4 ก้อน'
    },
    features: [
      'วัดความดันโลหิตอัตโนมัติ',
      'เก็บบันทึกได้ 60 ครั้ง',
      'แสดงวันที่และเวลา',
      'ตรวจจับการเต้นผิดปกติ',
      'ปิดอัตโนมัติเพื่อประหยัดแบตเตอรี่'
    ],
    usageInstructions: [
      'นั่งให้สบาย ผ่อนคลาย 5 นาที',
      'พันแม็นเซ็ตรอบแขนข้างซ้าย',
      'วางแขนราบกับโต๊ะ ระดับเดียวกับหัวใจ',
      'กดปุ่ม START เพื่อเริ่มวัด',
      'นิ่งๆ รอผลการวัด',
      'บันทึกผลการวัด'
    ],
    warnings: [
      'ห้ามใช้กับเด็กอายุต่ำกว่า 12 ปี',
      'ไม่เหมาะกับผู้ที่มีเครื่องกระตุ้นหัวใจ',
      'ทำความสะอาดด้วยผ้าชุบน้ำเท่านั้น',
      'เก็บในที่แห้ง หลีกเลี่ยงแสงแดด'
    ],
    operatingHours: {
      open: '08:00',
      close: '17:00',
      breakTime: { start: '12:00', end: '13:00' }
    }
  },
  2: {
    equipment_id: 2,
    equipment_code: 'BG001',
    equipment_name: 'เครื่องวัดระดับน้ำตาลในเลือด',
    description: 'เครื่องตรวจน้ำตาลในเลือด พร้อมแผ่นทดสอบ 50 ชิ้น และเข็มเจาะเลือด',
    brand_model: 'Accu-Chek Active',
    status: 'in_use' as const,
    location: 'ห้องอุปกรณ์ B - RSU Medical Clinic',
    max_borrow_days: 5,
    category: 'การตรวจวิเคราะห์',
    rating: 4.6,
    borrowCount: 32,
    specifications: {
      'ขนาด': '9.8 × 5.6 × 2.1 ซม.',
      'น้ำหนัก': '60 กรัม',
      'เวลาวัด': '5 วินาที',
      'หน่วยความจำ': '200 ครั้ง',
      'แหล่งพลังงาน': 'ถ่าน CR2032 1 ก้อน'
    },
    features: [
      'วัดน้ำตาลในเลือดได้รวดเร็ว',
      'เก็บบันทึกได้ 200 ครั้ง',
      'แสดงค่าเฉลี่ย 7, 14, 30 วัน',
      'เตือนเมื่อค่าผิดปกติ',
      'ใช้เลือดเพียงหยดเดียว'
    ],
    usageInstructions: [
      'ล้างมือให้สะอาด',
      'ใส่แผ่นทดสอบลงในเครื่อง',
      'เจาะนิ้วด้วยเข็มเจาะเลือด',
      'หยดเลือดลงบนแผ่นทดสอบ',
      'รอผลการวัด 5 วินาที',
      'บันทึกผลการวัด'
    ],
    warnings: [
      'ใช้แผ่นทดสอบครั้งละ 1 แผ่น',
      'เก็บแผ่นทดสอบในที่แห้ง',
      'ตรวจสอบวันหมดอายุแผ่นทดสอบ',
      'ทิ้งเข็มเจาะเลือดอย่างปลอดภัย'
    ],
    operatingHours: {
      open: '08:00',
      close: '17:00',
      breakTime: { start: '12:00', end: '13:00' }
    }
  },
  3: {
    equipment_id: 3,
    equipment_code: 'TH001',
    equipment_name: 'เครื่องวัดอุณหภูมิ',
    description: 'เครื่องวัดอุณหภูมิทางหู แบบดิจิทัล ความแม่นยำสูง',
    brand_model: 'Braun ThermoScan 7',
    status: 'available' as const,
    location: 'ห้องอุปกรณ์ B - RSU Medical Clinic',
    max_borrow_days: 3,
    category: 'การวัดสัญญาณชีพ',
    rating: 4.9,
    borrowCount: 67,
    specifications: {
      'ขนาด': '14.2 × 4.0 × 4.8 ซม.',
      'น้ำหนัก': '155 กรัม',
      'ช่วงการวัด': '34.0-42.2°C',
      'ความแม่นยำ': '±0.2°C',
      'หน่วยความจำ': '9 ครั้ง',
      'แหล่งพลังงาน': 'ถ่าน AA 2 ก้อน'
    },
    features: [
      'วัดอุณหภูมิทางหูอย่างรวดเร็ว',
      'ระบบ Age Precision',
      'เก็บบันทึกได้ 9 ครั้ง',
      'แสดงผลด้วยไฟสี',
      'หัววัดแบบใช้แล้วทิ้ง'
    ],
    usageInstructions: [
      'ใส่หัววัดแบบใช้แล้วทิ้ง',
      'ตั้งค่าอายุให้ถูกต้อง',
      'ใส่ลงในช่องหูอย่างระมัดระวัง',
      'กดปุ่มเริ่มวัด',
      'รอผลการวัด 1 วินาที',
      'ทิ้งหัววัดหลังใช้'
    ],
    warnings: [
      'ใช้หัววัดครั้งละ 1 ชิ้น',
      'ห้ามแกว่งหรือทำตกหล่น',
      'ทำความสะอาดด้วยแอลกอฮอล์',
      'เก็บในกล่องป้องกัน'
    ],
    operatingHours: {
      open: '08:00',
      close: '17:00',
      breakTime: { start: '12:00', end: '13:00' }
    }
  }
}

const mockReviews = [
  {
    id: 1,
    userName: 'น.ส. สุวิมล ใจดี',
    studentId: '651405***',
    rating: 5,
    comment: 'ใช้งานง่าย วัดแม่นยำ แนะนำเลยค่ะ',
    date: '2024-12-15',
    helpful: 12
  },
  {
    id: 2,
    userName: 'นาย วิชัย สมบูรณ์',
    studentId: '651406***',
    rating: 4,
    comment: 'ดีมาก แต่ต้องใส่ถ่านเยอะหน่อย',
    date: '2024-12-10',
    helpful: 8
  }
]

interface EquipmentDetailPageProps {
  params: { id: string }
}

export default function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'manual'>('details')
  const [showBookingModal, setShowBookingModal] = useState(false)

  // ดึงข้อมูลอุปกรณ์จาก mock data
  const equipment = mockEquipments[parseInt(params.id) as keyof typeof mockEquipments]

  // ถ้าไม่พบอุปกรณ์
  if (!equipment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-medical-800 mb-2">ไม่พบอุปกรณ์</h2>
          <p className="text-medical-600 mb-6">อุปกรณ์ที่คุณต้องการดูไม่มีในระบบ</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-medical-500 to-emerald-600 text-white rounded-xl hover:from-medical-600 hover:to-emerald-700 transition-all duration-200"
          >
            ← กลับหน้าหลัก
          </button>
        </div>
      </div>
    )
  }

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: equipment.equipment_name,
          text: `ดูอุปกรณ์: ${equipment.equipment_name} (${equipment.equipment_code}) - RSU Medical Clinic`,
          url: window.location.href
        })
      } catch (error) {
        console.log('การแชร์ถูกยกเลิก')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('ลิงก์ถูกคัดลอกแล้ว!')
    }
  }

  const renderStars = (rating: number, size: 'small' | 'large' = 'small') => {
    const sizeClass = size === 'large' ? 'h-6 w-6' : 'h-4 w-4'
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid
        key={i}
        className={`${sizeClass} ${
          i < Math.floor(rating) 
            ? 'text-amber-400' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-medical-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="p-2 rounded-xl text-medical-600 hover:text-medical-800 hover:bg-medical-50 transition-all duration-200"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </motion.button>
              <div>
                <h1 className="text-lg font-bold text-medical-800 line-clamp-1">
                  {equipment.equipment_name}
                </h1>
                <p className="text-sm text-medical-600">{equipment.equipment_code}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFavorited(!isFavorited)}
                className="p-2 rounded-xl hover:bg-medical-50 transition-colors"
              >
                {isFavorited ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-medical-400 hover:text-red-500" />
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-2 rounded-xl text-medical-400 hover:text-medical-600 hover:bg-medical-50 transition-all duration-200"
              >
                <ShareIcon className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-medical-100 overflow-hidden"
        >
          <div className="relative aspect-video bg-gradient-to-br from-medical-50 to-emerald-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-medical-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🩺</span>
                </div>
                <p className="text-medical-600 font-semibold">รูปภาพอุปกรณ์</p>
                <p className="text-sm text-medical-500">{equipment.equipment_name}</p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border backdrop-blur-sm ${status.badge}`}>
                <div className={`w-2 h-2 ${status.dot} rounded-full mr-2 animate-pulse`}></div>
                {status.text}
              </div>
            </div>

            {/* Equipment Code */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-medical-800 text-sm font-bold px-3 py-2 rounded-xl border border-medical-200">
              {equipment.equipment_code}
            </div>
          </div>
        </motion.div>

        {/* Main Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-medical-100 p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-medical-800 mb-2">
                {equipment.equipment_name}
              </h2>
              <p className="text-medical-600 text-lg mb-2">📱 {equipment.brand_model}</p>
              <p className="text-medical-500 leading-relaxed">{equipment.description}</p>
            </div>
          </div>

          {/* Rating and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl border border-amber-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {renderStars(equipment.rating, 'large')}
              </div>
              <div className="text-2xl font-bold text-amber-700">{equipment.rating}</div>
              <div className="text-sm text-amber-600">คะแนนเฉลี่ย</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl border border-blue-200">
              <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{equipment.borrowCount}</div>
              <div className="text-sm text-blue-600">ครั้งที่ยืม</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-medical-50 to-emerald-100 rounded-xl border border-medical-200">
              <ClockIcon className="h-8 w-8 text-medical-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-medical-700">{equipment.max_borrow_days}</div>
              <div className="text-sm text-medical-600">วันสูงสุด</div>
            </div>
          </div>

          {/* Location and Hours */}
          <div className="bg-gradient-to-r from-medical-50 to-emerald-50 rounded-xl p-4 mb-6 border border-medical-200">
            <div className="flex items-start space-x-3">
              <MapPinIcon className="h-6 w-6 text-medical-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-medical-800 mb-1">ที่ตั้งและเวลาบริการ</h4>
                <p className="text-medical-700 mb-2">{equipment.location}</p>
                <div className="text-sm text-medical-600">
                  <p>🕒 เปิดบริการ: {equipment.operatingHours.open} - {equipment.operatingHours.close} น.</p>
                  <p>🥪 พักเที่ยง: {equipment.operatingHours.breakTime.start} - {equipment.operatingHours.breakTime.end} น.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: isAvailable ? 1.02 : 1 }}
              whileTap={{ scale: isAvailable ? 0.98 : 1 }}
              disabled={!isAvailable}
              onClick={() => setShowBookingModal(true)}
              className={`
                flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3
                ${isAvailable
                  ? 'bg-gradient-to-r from-medical-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isAvailable ? (
                <>
                  <span>⏰</span>
                  <span>จองพร้อมเลือกเวลา</span>
                </>
              ) : (
                <>
                  <span>⏳</span>
                  <span>ไม่ว่าง</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 border-2 border-medical-300 text-medical-700 rounded-xl hover:border-medical-400 hover:bg-medical-50 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
            >
              <PhoneIcon className="h-5 w-5" />
              <span>ติดต่อเจ้าหน้าที่</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-medical-100"
        >
          {/* Tab Navigation */}
          <div className="border-b border-medical-200">
            <div className="flex">
              {[
                { key: 'details', label: 'รายละเอียด', icon: DocumentTextIcon },
                { key: 'reviews', label: 'รีวิว', icon: StarIcon },
                { key: 'manual', label: 'คู่มือ', icon: PlayCircleIcon }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`
                      flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-semibold transition-all duration-200
                      ${activeTab === tab.key
                        ? 'text-medical-600 border-b-2 border-medical-500 bg-medical-50'
                        : 'text-gray-500 hover:text-medical-600 hover:bg-medical-50'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Specifications */}
                  <div>
                    <h3 className="text-lg font-bold text-medical-800 mb-4 flex items-center">
                      <span className="mr-2">📊</span>
                      ข้อมูลทางเทคนิค
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(equipment.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 bg-medical-50 rounded-xl border border-medical-100">
                          <span className="font-medium text-medical-700">{key}:</span>
                          <span className="text-medical-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-bold text-medical-800 mb-4 flex items-center">
                      <span className="mr-2">✨</span>
                      คุณสมบัติเด่น
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {equipment.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                          <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                          <span className="text-emerald-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Usage Instructions */}
                  <div>
                    <h3 className="text-lg font-bold text-medical-800 mb-4 flex items-center">
                      <span className="mr-2">📋</span>
                      วิธีการใช้งาน
                    </h3>
                    <div className="space-y-3">
                      {equipment.usageInstructions.map((instruction, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-blue-800">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warnings */}
                  <div>
                    <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                      <ExclamationTriangleIcon className="h-6 w-6 mr-2 text-red-600" />
                      ข้อควรระวัง
                    </h3>
                    <div className="space-y-3">
                      {equipment.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl border border-red-200">
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5" />
                          <span className="text-red-800">{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-medical-800 mb-4 flex items-center">
                    <span className="mr-2">💬</span>
                    รีวิวจากผู้ใช้งาน ({mockReviews.length})
                  </h3>

                  {mockReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gradient-to-r from-medical-50 to-emerald-50 rounded-xl border border-medical-200">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-medical-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {review.userName.charAt(review.userName.indexOf(' ') + 1)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-medical-800">{review.userName}</h4>
                              <p className="text-sm text-medical-600">{review.studentId}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          <p className="text-medical-700 mb-2">{review.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="hover:text-medical-600 transition-colors">
                              👍 ชอบ ({review.helpful})
                            </button>
                            <button className="hover:text-medical-600 transition-colors">
                              💬 ตอบกลับ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Review Button */}
                  <div className="text-center pt-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-medical-500 to-emerald-600 text-white rounded-xl hover:from-medical-600 hover:to-emerald-700 transition-all duration-200 font-semibold">
                      ✍️ เขียนรีวิว
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'manual' && (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-medical-800 mb-4 flex items-center">
                    <span className="mr-2">📖</span>
                    คู่มือการใช้งาน
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-200 cursor-pointer"
                    >
                      <DocumentTextIcon className="h-12 w-12 text-red-600 mb-4" />
                      <h4 className="font-bold text-red-800 mb-2">📄 คู่มือ PDF</h4>
                      <p className="text-red-700 text-sm">ดาวน์โหลดคู่มือการใช้งานแบบละเอียด</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                    >
                      <PlayCircleIcon className="h-12 w-12 text-blue-600 mb-4" />
                      <h4 className="font-bold text-blue-800 mb-2">🎥 วิดีโอสอน</h4>
                      <p className="text-blue-700 text-sm">วิดีโอสาธิตการใช้งานทีละขั้นตอน</p>
                    </motion.div>
                  </div>

                  {/* Quick Tips */}
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-100 rounded-xl p-6 border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                      <span className="mr-2">💡</span>
                      เทิปการใช้งาน
                    </h4>
                    <ul className="text-yellow-700 text-sm space-y-2">
                      <li>• อ่านคู่มือก่อนใช้งานจริงทุกครั้ง</li>
                      <li>• ตรวจสอบแบตเตอรี่หรือการชาร์จก่อนใช้</li>
                      <li>• ทำความสะอาดตามคำแนะนำในคู่มือ</li>
                      <li>• หากมีปัญหาติดต่อเจ้าหน้าที่ทันที</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-medical-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-bold text-medical-800 mb-4">🎉 ระบบจองอัจฉริยะ</h3>
            <p className="text-medical-600 mb-6">
              ระบบ Smart Time Booking จะเปิดใช้งานเร็วๆ นี้!<br/>
              สามารถเลือกเวลาคืนอุปกรณ์ได้ตามสะดวก
            </p>
            
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center space-x-2 text-sm text-medical-700">
                <span>✅</span>
                <span>เลือกช่วงเวลาคืนได้ 3 แบบ</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-medical-700">
                <span>✅</span>
                <span>ระบบแจ้งเตือนอัตโนมัติ</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-medical-700">
                <span>✅</span>
                <span>ตรวจสอบความขัดแย้งล่วงหน้า</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                ปิด
              </button>
              <button 
                onClick={() => {
                  setShowBookingModal(false)
                  alert('🚀 เร็วๆ นี้! ระบบจองอัจฉริยะกำลังพัฒนา')
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-medical-500 to-emerald-600 text-white rounded-xl hover:from-medical-600 hover:to-emerald-700 transition-all duration-200 font-semibold"
              >
                แจ้งเตือนเมื่อพร้อม
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}