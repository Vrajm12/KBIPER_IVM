import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { User, Award, ChevronRight } from "lucide-react";

export interface CommitteeMember {
  id: string | number;
  name: string;
  role: string;
  designation?: string;
  department?: string;
  photoUrl?: string;
  isHead?: boolean;
}

interface CommitteeLayoutProps {
  title: string;
  subtitle: string;
  description?: string;
  members: CommitteeMember[];
}

export function CommitteeLayout({ title, subtitle, description, members }: CommitteeLayoutProps) {
  // Sort members so heads are first
  const sortedMembers = [...members].sort((a, b) => {
    if (a.isHead && !b.isHead) return -1;
    if (!a.isHead && b.isHead) return 1;
    return 0;
  });

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium tracking-wide uppercase">{subtitle}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight max-w-4xl"
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === title.split(' ').length - 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]" : ""}>
                {word}{" "}
              </span>
            ))}
          </motion.h1>
          
          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl font-light leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>

      {/* Members Section */}
      <section className="py-24 bg-muted/20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (idx % 3) * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative ${member.isHead ? 'md:col-span-2 lg:col-span-3 lg:w-2/3 mx-auto mb-12' : ''}`}
              >
                {/* Abstract animated background layer */}
                <div className={`absolute inset-0 rounded-3xl transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out ${member.isHead ? 'bg-accent/20' : 'bg-primary/5'}`} />
                
                {/* Main Card */}
                <div className="relative bg-white border border-muted p-8 rounded-3xl shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:border-accent/20 transition-all duration-500 flex flex-col h-full overflow-hidden">
                  
                  {/* Subtle Accent Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500" />
                  
                  <div className="relative z-10 flex items-start gap-6">
                    {/* Avatar */}
                    <div className="relative">
                      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-primary/5 flex items-center justify-center shrink-0 z-10 relative group-hover:scale-105 transition-transform duration-500 ${member.isHead ? 'ring-4 ring-accent/20 ring-offset-2' : ''}`}>
                        {member.photoUrl ? (
                          <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-10 h-10 text-primary/40" />
                        )}
                      </div>
                      {member.isHead && (
                        <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-full shadow-lg z-20">
                          <Award className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 pt-2">
                      <div className="inline-block px-3 py-1 bg-muted/50 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full mb-3 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                        {member.role}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">{member.name}</h3>
                      {member.designation && (
                        <p className="text-sm font-medium text-muted-foreground mb-1">{member.designation}</p>
                      )}
                      {member.department && (
                        <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
                          <ChevronRight className="w-3 h-3 text-accent" />
                          {member.department}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
