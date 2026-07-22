"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useTagsStore } from "@/lib/stores/EditProfile/Preferences/tagsStore";
import { useProfileStepStore } from "@/lib/stores/EditProfile/profileStepsStore";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function PreferencePage() {
  const { tags, fetchTags } = useTagsStore();
  const [searchTags, setSearchTags] = useState("");

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const filteredTags = useMemo(() => {
    if (!searchTags.trim()) return tags;
    const search = searchTags.toLowerCase();
    return tags.filter(
      (tag) =>
        tag.name_en.toLowerCase().includes(search) ||
        tag.notes?.toLowerCase().includes(search),
    );
  }, [tags, searchTags]);

  const groupedTags = useMemo(() => {
    const groups: Record<string, typeof filteredTags> = {};

    for (const tag of filteredTags) {
      if (!groups[tag.category]) {
        groups[tag.category] = [];
      }

      groups[tag.category].push(tag);
    }

    return Object.entries(groups);
  }, [filteredTags]);

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
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
            placeholder="Search tags (e.g. business, jobs, events)..."
            className="h-12 pl-10 focus-visible:ring-1 focus-visible:ring-(--brand-maroon)"
          />
        </div>

        <div>
          {groupedTags.length === 0 ? (
            <p className="text-zinc-500 text-xl font-semibold flex justify-center m-15">
              {" "}
              No tags found matching.{" "}
            </p>
          ) : (
            groupedTags.map(([category, tags]) => (
              <div key={category} className="space-y-4 mb-10">
                <h1 className="text-2xl font-bold">{category}</h1>

                <div className="grid grid-cols-2 gap-4">
                  {tags.map((tag) => (
                    <Card
                      key={tag.id}
                      className="border-red-400 bg-red-50/50 shadow-2xs p-5"
                    >
                      <h1 className="font-semibold text-xl">{tag.name_en}</h1>
                      <p className="text-sm text-zinc-500">{tag.notes}</p>

                      <div className="flex gap-3 mt-3 mb-3">
                        <Button variant="maroonRed" className="px-6">
                          Seeking
                        </Button>
                        <Button variant="lightRed" className="px-6">
                          Offering
                        </Button>
                      </div>

                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`feature-profile-${tag.id}`}
                          className="bg-white border-(--brand-maroon) data-checked:bg-(--brand-maroon) data-checked:border-(--brand-maroon) cursor-pointer"
                        />
                        <span className="text-zinc-500 text-sm">
                          Feature on profile
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
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
