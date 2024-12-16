<script lang="ts">
    import SEOPage from "$lib/SEOPage.svelte";
    import { WebsiteData } from "$lib/data/websiteData";
    import { resumeData } from "$lib/data/cv";
  
    export let resume = resumeData;
  
    const formatDates = (startDate: string, endDate: string) => `${startDate} - ${endDate}`;
  
    const title = `${WebsiteData.userName} | Résumé`;
    const description = "My resume";
    const canonical = `${WebsiteData.websiteAddress}/cv/`;
  </script>
  
  <SEOPage {title} {description} {canonical}>
    <div class="max-w-4xl mx-auto p-6 space-y-8 base-coloring-clear 
        shadow-md   shadow-yellow-950 dark:shadow-gray-300 rounded-lg border 
         ">
      <!-- Header Section -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-bold primary-coloring">{resume.name}</h1>
        <p class="">{resume.location}</p>
        <div class="space-x-4 text-sm ">
          <a href="mailto:{resume.email}" class="primary-coloring hover:underline">{resume.email}</a>
          <span>|</span>
          <a href="https://{resume.github}" target="_blank" class="primary-coloring hover:underline">GitHub</a>
          <span>|</span>
          <a href="https://{resume.linkedin}" target="_blank" class="primary-coloring hover:underline">LinkedIn</a>
          <span>|</span>
          <a href="https://{resume.personalSite}" target="_blank" class="primary-coloring hover:underline">Personal Site</a>
        </div>
      </div>
  
      <!-- Work Experience Section -->
      <section>
        <h2 class="text-2xl font-semibold primary-coloring mb-4">Work Experience</h2>
        <div class="space-y-6">
          {#each resume.workExperience as work}
            <div class="border-b pb-4">
              <h3 class="text-lg font-bold primary-coloring">{work.title} @ {work.company}</h3>
              <p class="text-sm ">{work.location} | {formatDates(work.dates.startDate, work.dates.endDate)}</p>
              <ul class="list-disc ml-6 mt-2  space-y-1">
                {#each work.responsibilities as responsibility}
                  <li>{responsibility}</li>
                {/each}
              </ul>
              <div class="mt-2 text-sm ">
                <strong>Technologies and Skills:</strong> {work.technologies.join(", ")}
              </div>
              {#if work.links}
                <div class="mt-2">
                  {#each work.links as link}
                    <a
                      href={link.url}
                      target="_blank"
                      class="text-sm underline primary-coloring"
                    >
                      {link.description} ->
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </section>
  
      <!-- Education Section -->
      <section>
        <h2 class="text-2xl font-semibold primary-coloring mb-4">Education</h2>
        {#each resume.education as edu}
          <div class="space-y-2">
            <h3 class="text-lg font-bold primary-coloring">{edu.degree}</h3>
            <p class="text-sm ">{edu.institution}</p>
            <p class="text-sm ">{formatDates(edu.dates.startDate, edu.dates.endDate)}</p>
          </div>
        {/each}
      </section>
  
      <!-- Projects Section -->
      <section>
        <h2 class="text-2xl font-semibold primary-coloring mb-4">Projects</h2>
        <div class="space-y-6">
          {#each resume.projects as project}
            <div class="border-b pb-4">
              <h3 class="text-lg font-bold primary-coloring">
                <a
                  href={`https://${project.url}`}
                  target="_blank"
                  class="primary-coloring hover:underline"
                >
                  {project.name}
                </a>
              </h3>
              <p class="text-sm ">{formatDates(project.dates.startDate, project.dates.endDate)}</p>
              <ul class="list-disc ml-6 mt-2  space-y-1">
                {#each project.description as line}
                  <li>{line}</li>
                {/each}
              </ul>
              <div class="mt-2 text-sm ">
                <strong>Technologies and Skills:</strong> {project.technologies.join(", ")}
              </div>
              {#if project.links}
                <div class="mt-2">
                  {#each project.links as link}
                    <a
                      href={link.url}
                      target="_blank"
                      class="text-sm underline primary-coloring"
                    >
                      {link.description} ->
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </section>
  
      <!-- Skills Section -->
      <section>
        <h2 class="text-2xl font-semibold primary-coloring mb-4">Skills</h2>
        <div class="space-y-2">
          <p class=""><strong>Programming Languages:</strong> {resume.skills.programmingLanguages.join(", ")}</p>
          <p class=""><strong>Technologies:</strong> {resume.skills.technologies.join(", ")}</p>
        </div>
      </section>
    </div>
  </SEOPage>
  