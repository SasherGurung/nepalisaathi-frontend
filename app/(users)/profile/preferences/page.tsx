"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useProfileStepStore } from "@/lib/stores/EditProfile/profileStepsStore";
import { Search } from "lucide-react";
import { useState } from "react";

export const tags = [
  {
    category: "Business & Services",
    items: [
      {
        title: "Local Nepali business recommendation",
        description: "Feeds directly into the business directory feature",
      },
      {
        title: "Promoting my own business/service",
        description:
          "Ad/directory monetization on-ramp — tag it so business owners self-identify",
      },
      {
        title: "Service referral (doctor, lawyer, accountant)",
        description:
          "Recommendations for trusted doctors, lawyers, or accountants.",
      },
    ],
  },
  {
    category: "Community & Social",
    items: [
      {
        title: "Festival celebration groups",
        description: "Strong seasonal spike potential — Dashain/Tihar",
      },
      {
        title: "Gaming buddy",
        description: "Find friends to play online or offline games together.",
      },
      {
        title: "Sports / hobby buddy",
        description: "Cricket, futsal, hiking, gym",
      },
      {
        title: "Language exchange",
        description: "English practice, common for new arrivals",
      },
      {
        title: "Just making friends",
        description: "Connect with new people and expand your social circle.",
      },
      {
        title: "Local meetups / events",
        description: "Find or organize social gatherings and local events.",
      },
      {
        title: "Mentor (general)",
        description: "Distinct from career mentorship",
      },
      {
        title: "Willing to mentor",
        description: '"Offering" direction',
      },
    ],
  },
  {
    category: "Education",
    items: [
      {
        title: "College / university guidance",
        description:
          "Advice on colleges, universities, and application procedures.",
      },
      {
        title: "Course selection guidance",
        description:
          "Information and help on selecting academic subjects/courses.",
      },
      {
        title: "Exam prep (IELTS/PTE/etc.)",
        description: "Very common diaspora need, easy to overlook",
      },
      {
        title: "Study group / partner",
        description:
          "Find partners to study for courses, exams, or degrees together.",
      },
      {
        title: "Tutoring",
        description: "Tag both directions: need vs. offering",
      },
    ],
  },
  {
    category: "Housing",
    items: [
      {
        title: "Room or accommodation",
        description:
          "Find rooms, houses, apartments, or shared living configurations.",
      },
      {
        title: "House-hunting guidance",
        description: "Advice-seeking, not actively searching for a room",
      },
      {
        title: "Roommate / flatmate",
        description: "Highest-demand tag, expect heavy use",
      },
      {
        title: "Subletting my place",
        description: "Advertise or seek short-term lease takeovers/sublets.",
      },
      {
        title: "Temporary / short-term stay",
        description: "Distinct from long-term roommate search",
      },
    ],
  },
  {
    category: "Settling In",
    items: [
      {
        title: "Bank account setup help",
        description:
          "Assistance setting up local bank accounts or credit cards.",
      },
      {
        title: "Visa / documentation guidance",
        description:
          "Help with visa applications, migrations, or local paperwork.",
      },
      {
        title: "Finding a doctor (Nepali-speaking preferred)",
        description:
          "Locating reliable medical clinics with Nepali-speaking staff.",
      },
      {
        title: "Healthcare / insurance guidance",
        description:
          "Guidance on local health systems, insurances, or clinics.",
      },
      {
        title: "Driving license conversion",
        description: "Steps and advice to convert foreign driving licenses.",
      },
      {
        title: "Just landed — need local orientation",
        description: "Pairs directly with the new-arrival matching flow",
      },
      {
        title: "SIM / mobile setup help",
        description:
          "Information on mobile plans, operators, and SIM card purchase.",
      },
    ],
  },
  {
    category: "Transport",
    items: [
      {
        title: "Airport pickup / drop-off",
        description:
          "High-value for new arrivals — surface prominently in new-arrival flow",
      },
      {
        title: "One-time ride",
        description: "One-off or occasional travel rides or carpools.",
      },
      {
        title: "Ride share / carpool",
        description: "Recurring commute use case",
      },
      {
        title: "Used vehicle buying guidance",
        description:
          "Guidance, suggestions, or advice on buying/leasing used cars.",
      },
    ],
  },
  {
    category: "Travel",
    items: [
      {
        title: "Heritage / cultural trip groups",
        description:
          "Group trips exploring cultural, historic, or heritage sites.",
      },
      {
        title: "Travelling to Nepal — companion",
        description:
          "Find companions travelling to Nepal during similar dates.",
      },
      {
        title: "Travel buddy (local trips)",
        description: "Find partners to travel with on local trips or holidays.",
      },
    ],
  },
  {
    category: "Work & Career",
    items: [
      {
        title: "Career mentorship",
        description:
          "Mentor or seek guidance on building a professional career.",
      },
      {
        title: "Full-time job search",
        description: "Full-time jobs and professional career opportunities.",
      },
      {
        title: "Internship",
        description:
          "Seeking or offering internship roles for training/experience.",
      },
      {
        title: "Interview prep",
        description:
          "Mock interviews, tips, and guidelines for job interviews.",
      },
      {
        title: "Job referral",
        description:
          "Request or offer job referrals in various companies/industries.",
      },
      {
        title: "Hiring / offering work",
        description: '"Offering" direction of job referral',
      },
      {
        title: "Part-time work",
        description:
          "Part-time jobs, shifts, or gigs suitable for students/workers.",
      },
      {
        title: "Resume/CV review",
        description:
          "Get help reviewing, polishing, or translating resumes and CVs.",
      },
    ],
  },
];

type Selection = "seeking" | "offering";

function PreferencePage() {

  const { addPreference } = useProfileStepStore();
  const [selections, setSelections] = useState<Record<string, Selection>>({});

  const handleSelect = (title: string, value: Selection) => {
    setSelections(
      (prev) =>
        ({
          ...prev,
          [title]: prev[title] === value ? undefined : value,
        }) as Record<string, Selection>,
    );
  };

  return (
    <div className="flex justify-center items-center my-13">
      <Card className="w-4xl space-y-5 p-15">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              What are you looking for?
            </h1>
            <p className="text-zinc-400 text-md tracking-wide mt-2">
              Select what you are seeking or offering below. You can select up
              to 10 tags.
            </p>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer p-5 text-zinc-400 text-base"
          >
            Skip
          </Button>
        </div>

        <div className="mt-13 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <Input
            placeholder="Search tags (e.g. business, jobs, events)..."
            className="h-12 pl-10 focus-visible:ring-1 focus-visible:ring-(--brand-maroon)"
          />
        </div>

        <div>
          {tags.map((tag) => (
            <div key={tag.category} className="space-y-4 mb-10">
              <h1 className="text-2xl font-bold">{tag.category}</h1>

              <div className="grid grid-cols-2 gap-4">
                {tag.items.map((item) => {
                  const selected = selections[item.title];
                  return (
                    <Card
                      key={item.title}
                      className="border-red-400 bg-red-50/50 shadow-2xs"
                    >
                      <h1 className="font-semibold text-xl">{item.title}</h1>
                      <p className="text-sm text-zinc-500">
                        {item.description}
                      </p>

                      <div className="flex gap-3 mt-3 mb-3">
                        <Button
                          variant={
                            selected === "seeking" ? "maroonRed" : "lightRed"
                          }
                          className="px-6"
                          onClick={() => handleSelect(item.title, "seeking")}
                        >
                          Seeking
                        </Button>

                        <Button
                          variant={
                            selected === "offering" ? "maroonRed" : "lightRed"
                          }
                          className="px-6"
                          onClick={() => handleSelect(item.title, "offering")}
                        >
                          Offering
                        </Button>
                      </div>

                      {selected && (
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`feature-profile-${item.title}`}
                            className="bg-white border-(--brand-maroon) data-checked:bg-(--brand-maroon) data-checked:border-(--brand-maroon) cursor-pointer"
                          />
                          <span className="text-zinc-500 text-sm">
                            Feature on profile
                          </span>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            variant="maroonRed"
            className="rounded-lg p-5 hover:bg-red-600"
          >
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default PreferencePage;
