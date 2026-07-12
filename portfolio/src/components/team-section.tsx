import type { TeamMember } from "@/data/courses";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Container } from "./layout/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TeamSection = ({ members }: { members: TeamMember[] }) => {
  if (!members || members.length === 0) return null;

  return (
    <section className="relative py-10">
      <Container>
        <div className="rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur md:p-10 lg:p-12">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-slate-500 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Team
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Team Members</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {members.map((member: TeamMember) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 text-sm font-black text-white ring-1 ring-slate-200">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-black leading-tight text-slate-950">
                      {member.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">Project collaborator</p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-xl text-slate-300 transition-colors group-hover:text-[#0077b5]"
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
