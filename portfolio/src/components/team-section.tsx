import type { TeamMember } from "@/data/courses";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Container } from "./layout/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TeamSection = ({ members }: { members: TeamMember[] }) => {
  if (!members || members.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            Team Members
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {members.map((member: TeamMember) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-background rounded-xl dark:hover:border-white transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                        {member.avatar ? (
                            <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            /* Fallback to first letter */
                            <span>{member.name.charAt(0)}</span>
                        )}
                    </div>
                  <div>
                    <p className="font-bold leading-tight group-hover:underline">
                      {member.name}
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon 
                  icon={faLinkedin} 
                  className="text-muted-foreground group-hover:text-[#0077b5] transition-colors text-xl" 
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;