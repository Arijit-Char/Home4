import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import '../App.scss';
import About from '../components/About';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Work from '../components/Work';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Testiminails from '../components/Testiminails';
import Layout from '../layouts/Layout';
import TypingAnimation from '../components/TypingAnimation';
import ParticlesBackground from '../ParticlesBackground';

function Home() {
    const [activeLink, setActiveLink] = useState('home');

    const params = useParams();
    const navigate = useNavigate();

    const userId = '65b3a22c01d900e96c4219ae'; // John doe

    const BASE_URL = 'https://portfolio-backend-30mp.onrender.com/api/v1';

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        document.cookie = `portfolio-name=portfolio1`;
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get/user/${params?.user ?? userId}`);

                const userData = await response.json();

                document.title = `${userData?.user?.about?.name + ' - ' + userData?.user?.about?.title}`;
                setUser(userData?.user);
                setIsLoading(false);
                document.body.classList.remove('loaded');
            } catch (error) {
                navigate('/');
                setIsLoading(true);
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [params?.user, userId, navigate]);

    console.log(user);

    // filtering all the data from the API
    const sortedFilteredSkills = user?.skills?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const sortedFilteredProject = user?.projects?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const filteredServices = user?.services?.filter((item) => item.enabled);
    const filteredTestimonials = user?.testimonials?.filter((item) => item.enabled);
    const filteredSocialHandles = user?.social_handles?.filter((item) => item.enabled);
    const filteredEducation = user?.timeline?.filter((item) => item.forEducation && item.enabled);
    const filteredExperience = user?.timeline?.filter((item) => !item.forEducation && item.enabled);
    const filteredAbout = user?.about;

    const [toggle, setToggle] = useState(false);

    if (filteredAbout === undefined) {
        return <div className="w-full h-screen bg-black flex items-center justify-center text-center">Loading..</div>;
    }
    console.log(filteredAbout);

    return (
        <>
            <Layout about={filteredAbout} social={filteredSocialHandles}>
                {/* Home Banner */}
                <section
                    id="home"
                    className="home-banner-02 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${filteredAbout.avatar.url})` }}
                >
                    <div id="particles-box" className="particles-box">
                        <ParticlesBackground />
                    </div>
                    <div className="container">
                        <div className="row full-screen align-items-center p-100px-tb">
                            <div className="col-12">
                                <div className="ht-text text-center">
                                    <h6>Hello There!</h6>
                                    <h1>I'm {filteredAbout.name}</h1>
                                    <div className="nav social-icons justify-content-center">
                                        <a href={filteredSocialHandles[3].url}>
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                        <a href={filteredSocialHandles[2].url}>
                                            <i className="fab fa-twitter" />
                                        </a>
                                        <a href={filteredSocialHandles[0].url}>
                                            <i className="fab fa-instagram" />
                                        </a>
                                        <a href={filteredSocialHandles[1].url}>
                                            <i className="fab fa-linkedin-in" />
                                        </a>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="go-to go-to-next">
                        <Link to="about">
                            <span />
                        </Link>
                    </div>
                </section>

                {/* End Home Banner */}
                {/* about us */}
                <About about={filteredAbout} social={filteredSocialHandles} />
                {/* end about us */}
                {/* fun */}
                <Skills skills={sortedFilteredSkills} about={filteredAbout} />
                {/* End fun */}
                {/* resume */}
                <Services services={filteredServices} about={filteredAbout} />
                {/* End resume */}
                {/* Work */}
                <Work work={sortedFilteredProject} about={filteredAbout} />
                {/* End work */}
                {/* Testimonials */}
                <Testiminails testimonials={filteredTestimonials} about={filteredAbout} />

                {/* End Testimonials */}
                {/* Blog */}
                <Blog services={filteredServices} about={filteredAbout} />
                {/* End Blog */}
                <Contact about={filteredAbout} />
            </Layout>
        </>
    );
}

export default Home;
