import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderProps } from '../sliderProps';

const Testiminails = ({ testimonials,about }) => {
    return (
        <section className="section gray-bg">
            <div className="container">
                <div className="row sm-m-25px-b m-35px-b">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h3 className="dark-color text-uppercase">Testimonials</h3>
                            <p className="text-uppercase small">A {about.title} based in {about.address}</p>
                        </div>
                    </div>
                </div>
                <Swiper {...sliderProps.testimonial}>
                    {/* testimonials */}
                    <SwiperSlide className="testimonial-col-01">
                        <div className="media">
                            <div className="img">
                                <img src="static/img/team-1.jpg" alt="image" />
                            </div>
                            <div className="media-body p-25px-l">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua. Ut enim ad minim veniam.
                                </p>
                                <div className="tc-info">
                                    <h6 className="font-alt dark-color font-w-600">Nancy Bayers</h6>
                                    <span>Co-founder</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* testimonials */}

                    {testimonials.map((testimonial) => (
                        <SwiperSlide className="testimonial-col-01">
                            <div className="media">
                                <div className="img">
                                    <img src={testimonial.image.url} alt="image" />
                                </div>
                                <div className="media-body p-25px-l">
                                    <p>{testimonial.review}</p>
                                    <div className="tc-info">
                                        <h6 className="font-alt dark-color font-w-600">{testimonial.name}</h6>
                                        <span>{testimonial.position}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    {/* / */}
                    <div className="owl-dots"></div>
                </Swiper>
            </div>
        </section>
    );
};
export default Testiminails;
