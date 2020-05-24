<template>
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

    <div slide-id="1" class="slide text-center min-h-screen pb-32 mx-auto md:w-5/6 xl:w-2/3">
      <h1 style="font-size: 3rem;"> <br> <br> That's all I have to say. Thanks for viewing my application! 🎉🎉</h1>

      <div>
        <h2 v-if="!creativeMode" class="mx-auto py-8">
          Click the checkbox at the top left to toggle creative mode, where I let loose and tell you about more stuff.
        </h2>
        <h2 v-else class="mx-auto py-8">
          Thanks for listening to my informal ramble 😅, click the toggle at the top left for a more formal rendition of what I've just said.
        </h2>
      </div>
    </div>

    <slide slideId="2">
       <span><span style="font-size: 4rem;">Hello! 👋</span> <br> <br> My Name is Tsowa Mainasara Al-amin and this is why i'll be a great fit. </span>

       <template v-slot:description>
         <span>A description</span>
       </template>
    </slide>

    <div class="mx-auto w-full py-4 arrow-container">
      <div role="button" v-bind:class="{ show: slideNumber + 1 < slideCount }" class="arrow" @click="moveSlide(1)">
        <img class="mx-auto my-auto h-6" src="~/assets/arrow.svg" alt="" srcset="">
      </div>
      <div role="button" v-bind:class="{ show: slideNumber > 0 }" class="arrow" @click="moveSlide(-1)">
        <img class="mx-auto my-auto h-6" src="~/assets/arrow-up.svg" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Slide from "~/components/Slide.vue";

export default Vue.extend({
  components: {
    Slide
  },

  data: ()=>({
    creativeMode: false,
    slideNumber: 0,
    slideCount: 0,
  }),

  mounted() {
    const slides = document.querySelectorAll('.slide');
    this.slideCount = slides.length;
    slides.forEach(e => this.isElementVisible(e as HTMLDivElement, i => this.slideNumber = i));
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
      // console.log(this.$refs['checkbox']);
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
