import { milestones } from './milestones';
import TimelineItem from './TimelineItem';
import RecentActivity from './RecentActivity';

const About: React.FC = () => {
  return (
    <section
      className="container bg-white p-6 rounded-lg shadow-md my-10"
      aria-labelledby="about-heading"
    >
      <h2
        id="about-heading"
        className="text-3xl font-bold text-gray-800 mb-6 text-center"
      >
        About Me
      </h2>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-gray-600 mb-6">
          I'm a Boston-born full-stack developer with over 8 years of
          professional experience crafting dynamic web applications. From my
          early days tinkering with SEGA consoles to graduating General
          Assembly's Web Development Immersive, I've honed a passion for clean,
          maintainable code and user-centric design. My expertise spans React,
          TypeScript, Ruby on Rails, and Node.js, with a commitment to
          delivering scalable, accessible solutions.
        </p>
      </div>
      <div className="space-y-8 mt-10">
        <h3 className="text-2xl font-semibold text-[--color-primary] text-center">
          Milestones
        </h3>
        {milestones.map((milestone, index) => (
          <TimelineItem key={index} {...milestone} />
        ))}
      </div>
      <RecentActivity />
    </section>
  );
};

export default About;
