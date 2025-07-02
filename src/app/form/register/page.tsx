'use client';

import styles from './register.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // แสดงข้อความสำเร็จ
    setShowSuccess(true);
    
    // รอ 3 วินาที แล้ว redirect ไปหน้า login-success
    setTimeout(() => {
      router.push('/form/login-success');
    }, 3000);
  };

  return (
    <div className={styles.container}>
      {/* Logo and Language Section */}
      <div className={styles.logoWrapper}>
        <div className={styles.logoSection}>
          <img 
            src="/logo.png" 
            alt="RSU Logo" 
            className={styles.logo}
          />
          <p className={styles.clinicText}>คลินิกเวชกรรมมหาวิทยาลัยรังสิต</p>
          <p className={styles.clinicTextEn}>RSU MEDICAL CLINIC</p>
          
          <div className={styles.langButtons}>
            <button className={`${styles.langBtn} ${styles.langBtnActive}`}>
              <span className={styles.checkIcon}>✓</span>
              ภาษาไทย
            </button>
            <button className={styles.langBtn}>
              <span className={styles.checkIconHidden}>✓</span>
              English
            </button>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>ลงทะเบียนผู้ใช้งาน</h2>
        
        <form onSubmit={handleSubmit} id="registerForm">
          <div className={styles.formGrid}>
            {/* Left Column */}
            <div className={styles.formColumn}>
              {/* Title and Name */}
              <div className={styles.formGroupRow}>
                <div className={styles.formGroupSmall}>
                  <label className={styles.label}>คำนำหน้า :</label>
                  <select className={styles.select}>
                    <option value="">เลือก</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                    <option value="ดร.">ดร.</option>
                    <option value="ผศ.">ผศ.</option>
                    <option value="รศ.">รศ.</option>
                    <option value="ศ.">ศ.</option>
                  </select>
                </div>
                <div className={styles.formGroupLarge}>
                  <label className={styles.label}>ชื่อ-นามสกุล :</label>
                  <input 
                    type="text" 
                    placeholder="ชื่อ-นามสกุล"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              {/* Faculty */}
              <div className={styles.formGroup}>
                <label className={styles.label}>คณะ/หน่วยงาน/สถาบัน/วิทยาลัย :</label>
                <select className={styles.select} required>
                  <option value="">เลือกหน่วยงาน</option>
                  <optgroup label="วิทยาศาสตร์ - สุขภาพ">
                    <option value="วิทยาลัยแพทยศาสตร์">วิทยาลัยแพทยศาสตร์</option>
                    <option value="วิทยาลัยการแพทย์แผนตะวันออก">วิทยาลัยการแพทย์แผนตะวันออก</option>
                    <option value="วิทยาลัยเภสัชศาสตร์">วิทยาลัยเภสัชศาสตร์</option>
                    <option value="วิทยาลัยทันตแพทยศาสตร์">วิทยาลัยทันตแพทยศาสตร์</option>
                    <option value="พยาบาลศาสตร์">คณะพยาบาลศาสตร์</option>
                    <option value="วิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                    <option value="กายภาพบำบัดและเวชศาสตร์การกีฬา">คณะกายภาพบำบัดและเวชศาสตร์การกีฬา</option>
                    <option value="เทคนิคการแพทย์">คณะเทคนิคการแพทย์</option>
                    <option value="ทัศนมาตรศาสตร์">คณะทัศนมาตรศาสตร์</option>
                    <option value="รังสีเทคนิค">คณะรังสีเทคนิค</option>
                    <option value="วิทยาลัยวิศวกรรมชีวการแพทย์">วิทยาลัยวิศวกรรมชีวการแพทย์</option>
                  </optgroup>
                  <optgroup label="วิศวกรรมศาสตร์ - เทคโนโลยี">
                    <option value="สถาบันการบิน">สถาบันการบิน</option>
                    <option value="วิทยาลัยวิศวกรรมศาสตร์">วิทยาลัยวิศวกรรมศาสตร์</option>
                    <option value="วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี">วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี</option>
                    <option value="วิทยาลัยนวัตกรรมเกษตร และเทคโนโลยีอาหาร">วิทยาลัยนวัตกรรมเกษตร และเทคโนโลยีอาหาร</option>
                    <option value="นวัตกรรมเกษตร">คณะนวัตกรรมเกษตร</option>
                    <option value="เทคโนโลยีอาหาร">คณะเทคโนโลยีอาหาร</option>
                  </optgroup>
                  <optgroup label="มนุษยศาสตร์ - สังคมศาสตร์">
                    <option value="วิทยาลัยนิเทศศาสตร์">วิทยาลัยนิเทศศาสตร์</option>
                    <option value="สถาบันรัฐประศาสนศาสตร์และนโยบายสาธารณะ">สถาบันรัฐประศาสนศาสตร์และนโยบายสาธารณะ</option>
                    <option value="วิทยาลัยศิลปศาสตร์">วิทยาลัยศิลปศาสตร์</option>
                    <option value="นิติศาสตร์">คณะนิติศาสตร์</option>
                    <option value="วิทยาลัยผู้นำและนวัตกรรมสังคม">วิทยาลัยผู้นำและนวัตกรรมสังคม</option>
                    <option value="วิทยาลัยครูสุริยเทพ">วิทยาลัยครูสุริยเทพ</option>
                    <option value="สถาบันภาษาอังกฤษ">สถาบันภาษาอังกฤษ</option>
                    <option value="สถาบัน Gen.Ed.">สถาบัน Gen.Ed.</option>
                    <option value="อาชญาวิทยาและการบริหารงานยุติธรรม">คณะอาชญาวิทยาและการบริหารงานยุติธรรม</option>
                    <option value="รัฐศาสตร์">คณะรัฐศาสตร์</option>
                    <option value="การทูตและการต่างประเทศ">คณะการทูตและการต่างประเทศ</option>
                  </optgroup>
                  <optgroup label="เศรษฐกิจ - ธุรกิจ">
                    <option value="บริหารธุรกิจ">คณะบริหารธุรกิจ</option>
                    <option value="วิทยาลัยการท่องเที่ยวและอุตสาหกรรมการบริการ">วิทยาลัยการท่องเที่ยวและอุตสาหกรรมการบริการ</option>
                    <option value="วิทยาลัยการกีฬา">วิทยาลัยการกีฬา</option>
                    <option value="บัญชี">คณะบัญชี</option>
                    <option value="เศรษฐศาสตร์">คณะเศรษฐศาสตร์</option>
                  </optgroup>
                  <optgroup label="ศิลปะ - การออกแบบ">
                    <option value="ดิจิทัลอาร์ต">คณะดิจิทัลอาร์ต</option>
                    <option value="วิทยาลัยการออกแบบ">วิทยาลัยการออกแบบ</option>
                    <option value="สถาปัตยกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์</option>
                    <option value="วิทยาลัยดนตรี">วิทยาลัยดนตรี</option>
                  </optgroup>
                  <optgroup label="หลักสูตรออนไลน์ / นานาชาติ / ป.โท-เอก">
                    <option value="บัณฑิตวิทยาลัย">บัณฑิตวิทยาลัย</option>
                    <option value="วิทยาลัยนานาชาติ">วิทยาลัยนานาชาติ</option>
                    <option value="International Chinese College">International Chinese College (中国国际学院)</option>
                    <option value="Rangsit Cyber University">Rangsit Cyber University</option>
                  </optgroup>
                  <optgroup label="ฝ่ายวิชาการ">
                    <option value="ศูนย์บริการทางวิชาการ">ศูนย์บริการทางวิชาการ</option>
                    <option value="สำนักงานประกันคุณภาพ">สำนักงานประกันคุณภาพ</option>
                    <option value="สำนักงานมาตรฐานวิชาการ">สำนักงานมาตรฐานวิชาการ</option>
                    <option value="สำนักหอสมุด">สำนักหอสมุด</option>
                  </optgroup>
                  <optgroup label="ฝ่ายการเงิน">
                    <option value="สำนักงานการเงิน">สำนักงานการเงิน</option>
                    <option value="สำนักงานงบประมาณ">สำนักงานงบประมาณ</option>
                    <option value="สำนักงานบัญชี">สำนักงานบัญชี</option>
                  </optgroup>
                  <optgroup label="หน่วยงานขึ้นตรงอธิการบดี">
                    <option value="สำนักงานอธิการบดี">สำนักงานอธิการบดี</option>
                    <option value="สำนักงานตรวจสอบภายใน">สำนักงานตรวจสอบภายใน</option>
                    <option value="สถาบันประเทศไทยต่อต้านการทุจริต">สถาบันประเทศไทยต่อต้านการทุจริต แห่งมหาวิทยาลัยรังสิต</option>
                    <option value="สถาบันไผ่กู้ชาติ">สถาบันไผ่กู้ชาติ</option>
                    <option value="ศูนย์ความเป็นเลิศด้านการแพทย์บูรณาการ">ศูนย์ความเป็นเลิศด้านการแพทย์บูรณาการและสาธารณสุข</option>
                    <option value="ศูนย์ความเป็นเลิศด้านปัญญาประดิษฐ์">ศูนย์ความเป็นเลิศด้านปัญญาประดิษฐ์และการคำนวนขั้นสูง</option>
                  </optgroup>
                  <optgroup label="ฝ่ายกิจการนักศึกษา">
                    <option value="สำนักงานกิจการนักศึกษา">สำนักงานกิจการนักศึกษา</option>
                    <option value="สำนักงานศิษย์เก่าและชุมชนสัมพันธ์">สำนักงานศิษย์เก่าและชุมชนสัมพันธ์</option>
                    <option value="สำนักงานสวัสดิการสุขภาพ">สำนักงานสวัสดิการสุขภาพ</option>
                    <option value="สำนักงานหอพัก">สำนักงานหอพัก</option>
                    <option value="สถาบันกีฬา">สถาบันกีฬา</option>
                    <option value="ศูนย์พัฒนากีฬาเชียร์ลีดดิ้ง">ศูนย์พัฒนากีฬาเชียร์ลีดดิ้ง มหาวิทยาลัยรังสิต</option>
                  </optgroup>
                  <optgroup label="ฝ่ายการต่างประเทศ">
                    <option value="สำนักงานนานาชาติ">สำนักงานนานาชาติ (สนช.)</option>
                    <option value="สถาบันจีน-ไทย">สถาบันจีน-ไทยแห่งมหาวิทยาลัยรังสิต (兰实大学中泰合作交流处)</option>
                    <option value="ศูนย์สุวรรณภูมิศึกษา">ศูนย์สุวรรณภูมิศึกษา</option>
                    <option value="Passage to ASEAN">Passage to ASEAN (P2A)</option>
                    <option value="AISC Office">ASEAN International Sandbox Conference (AISC) Office</option>
                  </optgroup>
                  <optgroup label="ฝ่ายบริหาร">
                    <option value="ศูนย์ RSU EX SPACE">ศูนย์ RSU EX SPACE</option>
                    <option value="สำนักงานบุคคล">สำนักงานบุคคล</option>
                    <option value="สำนักงานพัฒนาบุคคล">สำนักงานพัฒนาบุคคล</option>
                    <option value="สำนักงานนิติการ">สำนักงานนิติการ</option>
                    <option value="สำนักงานจัดซื้อและพัสดุ">สำนักงานจัดซื้อและพัสดุ</option>
                  </optgroup>
                  <optgroup label="ฝ่ายบริหารกิจการพิเศษ">
                    <option value="RSU Healthcare">RSU Healthcare</option>
                  </optgroup>
                  <optgroup label="ฝ่ายนวัตกรรม">
                    <option value="สำนักบริการเทคโนโลยีสารสนเทศ">สำนักบริการเทคโนโลยีสารสนเทศ</option>
                  </optgroup>
                  <optgroup label="ฝ่ายโรงเรียนสาธิต และวิสาหกิจ">
                    <option value="สำนักงานบ่มเพาะธุรกิจ">สำนักงานบ่มเพาะธุรกิจ และทรัพย์สินทางปัญญา</option>
                  </optgroup>
                  <optgroup label="ฝ่ายพัฒนาสังคมศิลปวัฒนธรรม และสิทธิประโยชน์">
                    <option value="ฝ่ายพัฒนาสังคมและศิลปวัฒนธรรม">ฝ่ายพัฒนาสังคมและศิลปวัฒนธรรม</option>
                    <option value="สถาบันศิลปวัฒนธรรมและพัฒนาสังคม">สถาบันศิลปวัฒนธรรมและพัฒนาสังคม</option>
                    <option value="สำนักพิมพ์">สำนักพิมพ์</option>
                    <option value="สำนักงานสิทธิประโยชน์">สำนักงานสิทธิประโยชน์</option>
                  </optgroup>
                  <optgroup label="ฝ่ายความปลอดภัย">
                    <option value="สำนักงานตำรวจมหาวิทยาลัยรังสิต">สำนักงานตำรวจมหาวิทยาลัยรังสิต</option>
                    <option value="สำนักงานอาคารและสิ่งแวดล้อม">สำนักงานอาคารและสิ่งแวดล้อม</option>
                    <option value="สถาบันการจัดการความปลอดภัย">สถาบันการจัดการความปลอดภัยและนวัตกรรม</option>
                  </optgroup>
                  <optgroup label="ฝ่ายวิจัย">
                    <option value="สถาบันวิจัย">สถาบันวิจัย</option>
                    <option value="สำนักงานจริยธรรมการวิจัย">สำนักงานจริยธรรมการวิจัย</option>
                  </optgroup>
                  <optgroup label="ฝ่ายแผนและพัฒนา">
                    <option value="ฝ่ายแนะแนวและรับนักศึกษา">ฝ่ายแนะแนวและรับนักศึกษา</option>
                    <option value="ฝ่ายสื่อสารองค์กร">ฝ่ายสื่อสารองค์กร</option>
                    <option value="สำนักงานวางแผนและพัฒนา">สำนักงานวางแผนและพัฒนา</option>
                    <option value="สำนักงานทะเบียน">สำนักงานทะเบียน</option>
                    <option value="สำนักงาน Wisdom Media">สำนักงาน Wisdom Media</option>
                  </optgroup>
                  <optgroup label="หน่วยงานขึ้นตรงกลุ่มวิทยาลัยแพทยศาสตร์และวิทยาศาสตร์สุขภาพ">
                    <option value="ศูนย์เครื่องมือวิจัยวิทยาศาสตร์">ศูนย์เครื่องมือวิจัยวิทยาศาสตร์ เทคโนโลยีและมาตรฐานฮาลาล</option>
                  </optgroup>
                  <optgroup label="หน่วยงานสังกัดวิทยาลัยนวัตกรรมสังคม">
                    <option value="สถาบันปฏิรูปประเทศไทย">สถาบันปฏิรูปประเทศไทย</option>
                  </optgroup>
                  <optgroup label="หน่วยงานสังกัดวิทยาลัยนวัตกรรมเกษตร เทคโนโลยีชีวภาพ และอาหาร">
                    <option value="ศูนย์วิจัยและบริการวิชาการ">ศูนย์วิจัยและบริการวิชาการ</option>
                  </optgroup>
                  <optgroup label="หน่วยงานขึ้นตรงกลุ่มวิทยาลัยวิศวกรรมศาสตร์">
                    <option value="ศูนย์การเปลี่ยนแปลงภูมิอากาศ">ศูนย์การเปลี่ยนแปลงภูมิอากาศและภัยพิบัติ</option>
                  </optgroup>
                </select>
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label className={styles.label}>อีเมล :</label>
                <input 
                  type="email" 
                  placeholder="example@rsu.ac.th"
                  className={styles.input}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
              </div>

              {/* Phone */}
              <div className={styles.formGroup}>
                <label className={styles.label}>เบอร์โทรศัพท์ :</label>
                <input 
                  type="tel" 
                  placeholder="0812345678"
                  className={styles.input}
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.formColumn}>
              {/* Student/Staff ID */}
              <div className={styles.formGroup}>
                <label className={styles.label}>รหัสนักศึกษา/บุคลากร :</label>
                <input 
                  type="text" 
                  placeholder="รหัส 7 หลัก"
                  className={styles.input}
                  pattern="[0-9]{7}"
                  maxLength={7}
                  required
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <span className={styles.helperText}>กรอกตัวเลข 7 หลัก</span>
              </div>

              {/* Status */}
              <div className={styles.formGroup}>
                <label className={styles.label}>สถานะ :</label>
                <select className={styles.select} required>
                  <option value="">เลือกสถานะ</option>
                  <option value="student">นักศึกษา</option>
                  <option value="staff">บุคลากร</option>
                  <option value="faculty">อาจารย์</option>
                </select>
              </div>

              {/* Gender */}
              <div className={styles.formGroup}>
                <label className={styles.label}>เพศ :</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="male" />
                    <span>ชาย</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="female" />
                    <span>หญิง</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="other" />
                    <span>อื่นๆ</span>
                  </label>
                </div>
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label className={styles.label}>รหัสผ่าน :</label>
                <input 
                  type="password" 
                  placeholder="รหัสผ่าน"
                  className={styles.input}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="ต้องมีตัวเลข, ตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่ และอย่างน้อย 8 ตัว"
                  required
                />
                <span className={styles.helperText}>ต้องมีตัวพิมพ์เล็ก, ใหญ่, ตัวเลข อย่างน้อย 8 ตัว</span>
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label className={styles.label}>ยืนยันรหัสผ่าน :</label>
                <input 
                  type="password" 
                  placeholder="ยืนยันรหัสผ่าน"
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <Link href="../form" className={styles.backButton}>
            <span className={styles.backIcon}>‹</span>
            ย้อนกลับ
          </Link>
          <button type="submit" form="registerForm" className={styles.registerButton}>
            ลงทะเบียน
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.modalTitle}>ลงทะเบียนสำเร็จ!</h3>
            <p className={styles.modalText}>
              ระบบได้ส่งข้อมูลการลงทะเบียนไปยังอีเมลของคุณแล้ว
            </p>
            <p className={styles.modalSubtext}>
              กำลังนำคุณไปยังหน้าเข้าสู่ระบบ...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}