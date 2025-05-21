import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import './Home.css';

// Import the local images
import Admin from './images/Admin.png';
import Student from './images/Student1.jpg';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';

// Add more images if needed

const Home = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000 }} // 3 seconds delay
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <img src={image1} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt="Slide 2" />
        </SwiperSlide>
        {/* Add more slides as needed */}
        <SwiperSlide>
          <img src={image3} alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image4} alt="Slide 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image5} alt="Slide 5" />
        </SwiperSlide>
      </Swiper>
      <div className="activities">
        <div className="activity">
          <h2>Admin Activities</h2>
          <img src={Admin} alt="Admin Activities" />
          <p><br></br>Administrators can log in to view and manage all certificates uploaded by students. They can utilize filters such as branch, course, and year to search for specific certificates. Administrators have access to all certificates and can download them as required. Additionally, they oversee certificate management, user authentication, system maintenance, and ensure compliance and security within the portal.</p>
        </div>
        <div className="activity">
          <h2>Student Activities</h2>
          <img src={Student} alt="Student Activities" />
          <p><br></br><br></br>Students can log in to upload their certificates for verification and management. They can easily update their personal and academic details within the portal. The system also allows students to view and track all previously uploaded certificates, ensuring they have a comprehensive record of their submissions. This functionality enables students to manage their academic documentation efficiently and stay informed about the status of their certificates.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
