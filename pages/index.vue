<template ref="page">
  <div>
    <div ref="toggle_background" class="toggle-background" title="Toggle Creative Mode" @click="toggleCreativeMode()">
      <input ref="checkbox" type="checkbox" name="creative_mode" id="creative">
      <div class="toggle"></div>
    </div>
    <div slide-id="0" class="slide text-center min-h-screen py-32 mx-auto md:w-5/6 xl:w-2/3">
      <h1 style="font-size: 3rem;"> <span style="font-size: 4rem;">Hello! 👋</span> <br> <br> My Name is Tsowa Mainasara Al-amin and this is why i'll be a great fit. </h1>

      <div>
        <h2 class="mx-auto py-8">
          All neatly put into very important bullet points.
        </h2>
      </div>
    </div>

    <slide v-bind:slideId='slides.indexOf(slide) + 1' v-for="slide in slides" v-bind:key="slide.title">
      <h1><span style="font-size: 4rem;">{{ slides.indexOf(slide) + 1 }}</span> <br> <br>  <span>{{ slide.title }}</span></h1>

      <template v-slot:description style="text-align: initial">
        <client-only>
          <MDXProvider v-bind:components="{ wrap: props => 'stuff'}">
            <component :is="slide.MDXSlide"></component>
          </MDXProvider>
        </client-only>
      </template>
    </slide>

    <div v-bind:slide-id="slideCount - 1" class="slide text-center min-h-screen py-32 mx-auto md:w-5/6 xl:w-2/3">
      <h1 style="font-size: 3rem;"> <span style="font-size: 4rem;"><slide-text inline creative>The End! 😢</slide-text> </span> <br> That's all I have to say. Thanks for viewing my application! 🎉🎉</h1>

      <div>
        <slide-text creative>Thanks for hearing me out! If you'd like to see a more formal rendition of what I said, click the toggle at the top left</slide-text>
        <slide-text formal>Thanks for reading. Loooking forward to hearing from you. If you'd like to read a more informal version of these slide, click the toggle at the top left</slide-text>
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
        MDXSlide: SlideLaravel
      },
      {
        title: "I am a fast learner",
        MDXSlide: SlideRapid
      },
      {
        title: "I am a tinkerer at heart",
        MDXSlide: SlideTinkerer
      }
    ]
  }),

  mounted() {
    const slides = document.querySelectorAll('.slide');
    this.slideCount = slides.length;
    console.log(this.creativeMode, this.slideNumber)
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
