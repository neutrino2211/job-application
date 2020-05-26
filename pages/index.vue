<template ref="page">
  <div>
    <div ref="toggle_background" class="toggle-background" title="Toggle Creative Mode" @click="toggleCreativeMode()">
      <input ref="checkbox" type="checkbox" name="creative_mode" id="creative">
      <div class="toggle"></div>
    </div>

    <div slide-id="0" class="slide text-center min-h-screen py-32 mx-auto md:w-5/6 xl:w-2/3">
      <h1 style="font-size: 3rem;"> <span style="font-size: 4rem;">Hello! 👋</span> <br> <br> My Name is Tsowa Mainasara Al-amin and this is my awesome application </h1>
    </div>

    <div slide-id="1" class="slide text-center min-h-screen py-32 mx-auto md:w-5/6 xl:w-2/3">
      <span style="font-size: 4rem;">Why Are We A Great Fit For Each Other?</span>

      <div>
        <h2 style="font-size: 2.5rem; font-weight: 100 !important;" class="mx-auto py-8">
          <slide-text formal>Here's why I think we'll be a great fit for each other</slide-text>
          <slide-text creative>Well... here goes...</slide-text>
        </h2>
      </div>
    </div>

    <slide v-bind:slideId='slides.indexOf(slide) + 2' v-for="slide in slides" v-bind:key="slide.title">
      <h1>
        <span style="font-size: 4rem;">{{ slides.indexOf(slide) + 1 }}</span> <br> <br>  
        <slide-text formal inline v-bind:mode="creativeMode">{{ slide.title }}</slide-text>
        <slide-text creative inline v-bind:mode="creativeMode">{{ slide.creativeTitle || slide.title }}</slide-text>
      </h1>

      <template v-slot:description style="text-align: initial">
        <client-only>
          <MDXProvider v-bind:components="{ wrap: props => 'stuff'}">
            <component :is="slide.MDXSlide"></component>
          </MDXProvider>
          <slide-text creative v-bind:mode="creativeMode"> {{ slide.creativeText }} </slide-text>
        </client-only>
      </template>
    </slide>

    <slide v-bind:slideId="slides.length + 2">
       <span style="font-size: 4rem;">What Do You See The Future Being Like If We Work Together?</span> <br> <br>

       <template v-slot:description>
         <h1>I see a future where we work together to keep improving tailwind and making it the go to in more facets of web development.</h1>
       </template>
    </slide>

    <slide v-bind:slideId="slides.length + 3">
       <span style="font-size: 4rem;">What Are You Excited About In The Industry These Days?</span> <br> <br>

       <template v-slot:description>
         <h1>
            I am very excited about how the server-side of web development is being treated these days. Before the advent of serverless and web frameworks, 
            making sites was a very big pain but these days everything is considerably easier with frameworks/libraries like Angular, Vue and React. Not
            to mention things like Nuxt and Next.js that combine the ease of making websites with these libraries with the performance improvements of being statically
            served.

            <slide-text creative v-bind:mode="creativeMode">
              And then there's the whole deno thing which, the whole distasteful beef aside, is very exciting as it means there's an alternative.
              And having alternatives is always a good thing.
            </slide-text>
          </h1>
       </template>
    </slide>

    <slide v-bind:slideId="slides.length + 4">
       <span style="font-size: 4rem;">What Are You Betting On For The Future?</span> <br> <br>

       <template v-slot:description>
          <h1>
            {{ creativeMode ? 'I personally don\'t like predicting things but' : '' }} I believe web technologies are slowly going to merge with computing in ways we never thought before like more of IoT being accessible and Mainframes
            being a thing again. It has already started with the whole game streaming services and I don't think that's where it will end.</h1>
       </template>
    </slide>

    <slide v-bind:slideId="slides.length + 5">
       <span style="font-size: 4rem;">Is there a project or feature you'd love for us to build together? </span> <br> <br>

       <template v-slot:description>
          <h1>I honestly don't know, {{ creativeMode ? 'we can hopefully have that discussion mid July 😉.' : 'the work done on tailwind is already impressive. I just hope to be of great use.' }}</h1>
       </template>
    </slide>

    <div v-bind:slide-id="slideCount - 1" class="slide text-center min-h-screen py-32 mx-auto md:w-5/6 xl:w-2/3">
      <h1 style="font-size: 3rem;"> <span style="font-size: 4rem;"><slide-text inline creative>The End! 😢</slide-text> </span> <br> That's all I have to say. Thanks for viewing my application! 🎉🎉</h1>

      <div>
        <slide-text creative>Thanks for hearing me out! If you'd like to see a more formal rendition of what I said, click the toggle at the top left</slide-text>
        <slide-text formal>Thanks for reading. Loooking forward to hearing from you. If you'd like to read a more informal version of these slides, click the toggle at the top left</slide-text>
        <br>
        Here's a link to my <a href="https://neutrino2211.github.io" target="_blank">portfolio</a> if you want to have a look.
      </div>
    </div>

    <div class="mx-auto w-full py-4 arrow-container">
      <div role="button" v-bind:class="{ show: slideNumber + 1 < slideCount }" :aria-disabled="slideNumber + 1 < slideCount" class="arrow" @click="moveSlide(1)">
        <img class="mx-auto my-auto h-6" src="~/assets/arrow.svg" alt="" srcset="">
      </div>
      <div role="button" v-bind:class="{ show: slideNumber > 0 }" :aria-disabled="slideNumber > 0" class="arrow" @click="moveSlide(-1)">
        <img class="mx-auto my-auto h-6" src="~/assets/arrow-up.svg" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/// <reference path="../declaration.d.ts"/>
import Vue from 'vue'
import { MDXProvider } from "@mdx-js/vue";

import Text from "~/components/Text.vue";
import Slide from "~/components/Slide.vue";

import SlideIntroduction from "~/assets/mdx/slide-introduction.mdx";
import SlideLaravel from "~/assets/mdx/slide-laravel.mdx";
import SlideRapid from "~/assets/mdx/slide-rapid.mdx";
import SlideTinkerer from "~/assets/mdx/slide-tinkerer.mdx";
import SlideCommandLine from "~/assets/mdx/slide-commandline.mdx";

export default Vue.extend({
  components: {
    'slide-text': Text,
    Slide,
    MDXProvider,
    SlideIntroduction
  },

  data: ()=>({
    creativeMode: false,
    slideNumber: 0,
    slideCount: 0,
    slides: [
      {
        title: "I'm very good with VueJS",
        MDXSlide: SlideIntroduction
      },
      {
        title: "I have sufficient Laravel experience",
        creativeTitle: 'I have sufficient Laravel experience... I think',
        MDXSlide: SlideLaravel
      },
      {
        title: "I am a fast learner",
        creativeTitle: 'I am a fast learner brrrr 💨',
        MDXSlide: SlideRapid,
        creativeText: "Not gonna lie, I misread the job placement and learnt nuxt instead of Next.js 💀"
      },
      {
        title: "I am a tinkerer at heart",
        MDXSlide: SlideTinkerer
      },
      {
        title: "I have worked on CLI toolkits before",
        creativeTitle: "I'm a freaking CLI wizard 😎",
        MDXSlide: SlideCommandLine,
        creativeText: "I honestly love the project, it's helped a lot but I haven't had time to document it so it's just sitting on my computer 😅"
      }
    ]
  }),

  mounted() {
    const slides = document.querySelectorAll('.slide');
    this.slideCount = slides.length;
    slides.forEach(e => this.isElementVisible(e as HTMLDivElement, i => this.slideNumber = i));


    document.addEventListener('keydown', e => {
      if (e.keyCode == 38) {
        e.preventDefault();
        this.moveSlide(-1);
      } else if (e.keyCode == 40) {
        e.preventDefault();
        this.moveSlide(1);
      }
    })
  },

  methods: {
    toggleCreativeMode() {
      const toggle = (this.$refs['checkbox'] as HTMLInputElement);
      const toggleBack = (this.$refs['toggle_background'] as HTMLDivElement);

      toggle.click();
      
      if (toggle.checked) {
        toggleBack.style.backgroundColor = "#67e999";
      } else {
        toggleBack.style.backgroundColor = "#7bac8e";
      }

      this.creativeMode = toggle.checked;
    },

    isElementVisible(element: HTMLDivElement, callback: (elNumber: number) => void) {
      var observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting === true) {
          const el = entries[0].target;

          callback(Number(el.getAttribute('slide-id') || 0));
        }
      }, { threshold: [0.5] });

      observer.observe(element);
    },

    moveSlide(i: number) {
      const newNumber = this.slideNumber + i;

      if (newNumber < 0 || newNumber >= this.slideCount) return;

      this.slideNumber = newNumber;
      const query = `div[slide-id="${this.slideNumber}"]`;
      const slide = document.querySelector(query);
      slide?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }
})
</script>

<style lang="scss" scoped>

p {
  @apply py-8;
}

.arrow {
  transition: all 0.2s ease-in;
  padding: 5px;
  color: #afe9c6;
  display: inline-flex;
  opacity: 0.3;

  @apply w-10 mx-2;
}

.arrow-container {
  bottom: 0;
  position: fixed;
  text-align: center;
  background-color: #c2f0d4;

}

img {
  cursor: pointer;
}

.arrow:not(.show):hover {
  transform: initial;
}

.arrow.show:hover {
  transform: scale(1.1);
}

.toggle-background {
  background-color: #7bac8e;
  border-radius: 20px;
  position: fixed;
  padding-bottom: 0.25rem;
  cursor: pointer;
  transition: 0.4s;
  @apply w-12 m-4;

  input {
    opacity: 0;
    height: 0;
    width: 0;

    &:checked + .toggle {
      margin-left: 1.75rem;
    }
  }

  .toggle {
    border-radius: 50%;
    background-color: white;
    
    margin-top: -1.25rem;
    margin-left: 0.25rem;
    transition: 0.4s;
    @apply w-4 h-4;
  }
}

.show {
  opacity: 1;
}
</style>
