<template>
  <div>
    <section id="page" class="min-h-screen pt-4 pb-4 bg-purple-100">
      <div class="sm:container">
        <div class="w-full">
          <div class="flex justify-center">
            <div class="bg-white rounded-md shadow-lg overflow-hidden mb-10 mx-auto w-full max-w-[320px] md:max-w-[700px]">
              <div class="px-4 md:px-10 py-6 font-semibold text-dark text-2xl">
                Gift Card
              </div>
              <hr class=""/>
              
              <div class="px-4 md:px-10 py-6">
                <div id="gift-card" class="mb-10 relative" v-show="previewImage !== null" >
                  <img
                    :src="previewImage"
                    alt="Gift Card"
                    class="w-full mx-auto my-auto h-full"
                  />
                  <p class="absolute z-11 text-xs w-[8.5rem] left-[8.2rem] top-[5rem] md:text-2xl md:w-[18.7rem] md:left-[17.7rem] md:top-[11.1rem]">{{formInput.dear}}</p>
                  <p class="absolute z-10 overflow-hidden text-xs w-[12rem] h-[3.3rem] left-[5.3rem] top-[6.3rem] md:text-2xl md:w-[25rem] md:h-[6.3rem] md:left-[11.4rem] md:top-[13.9rem] leading-[1.5rem] md:leading-[3.1rem]">{{formInput.message}}</p>
                  <p class="absolute z-11 text-xs w-[10rem] left-[7.45rem] top-[9.6rem] md:text-2xl md:w-[20.4rem] md:left-[16rem] md:top-[21rem]">{{formInput.from}}</p>
                </div>
                <div class="mb-10">
                  <label for="dear" class="block mb-2 text-sm" >File Upload</label>
                  <div class="flex-1 items-center max-w-screen mx-auto mb-3 space-y-4" 
                       @dragover="dragover" @drop="doDrop">
                    <div class="relative w-full">
                      <label class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none" id="drop">
                        <div class="flex flex-col items-center justify-center">
                            <i class="fas fa-cloud-upload-alt fa-2x text-gray-400 mb-2"></i>
                            <div class="font-bold text-xl">Browse Files</div>
                            <div class="font-medium text-gray-600 text-sm">Drag and drop files here</div>
                        </div>
                        <input ref="file" type="file" name="file_upload" class="hidden" accept="image/png,image/jpeg" @change="uploadImage">
                      </label>
                    </div>
                  </div>

                </div>
                <div class="mb-10">
                  <label for="dear" class="block mb-2 text-sm" >Dear</label>
                  <input class="w-full md:w-1/2 border border-gray-400 text-dark px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary" 
                    type="text" name="dear" id="dear" v-model="formInput.dear" />
                </div>
                <div class="mb-10">
                  <label for="message" class="block mb-2" >Message</label>
                  <input class="w-full md:w-1/2 border border-gray-400 text-dark px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    type="text" name="message" id="message" v-model="formInput.message" />
                </div>
                <div class="mb-10">
                  <label for="from" class="block mb-2" >From</label>
                  <input class="w-full md:w-1/2 border border-gray-400 text-dark px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    type="text" name="from" id="from" v-model="formInput.from" />
                </div>
              </div>
              <hr class=""/>
              <div class="px-10 py-6 text-center">
                <button class="w-full md:w-auto px-12 py-2 rounded-sm bg-green-500 text-white" @click="doDownload">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Alert :data="alertData" :isOpen="isOpen" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import html2canvas from 'html2canvas';
import Alert from "@/components/Alert.vue";

defineProps({
  msg: String,
})

const previewImage = ref(null)
const formInput = ref({
  dear: '',
  message: '',
  from: '',
})
const isOpen = ref(false)
const alertData = reactive({
  title: 'Information',
  msg: 'Form input belum lengkap!',
  type: 'Notif',
})
const closeModal = () => {
  isOpen.value = false
}
const uploadImage = (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e =>{
      previewImage.value = e.target.result;
  };
}
const dragover = (e) => {
  e.preventDefault();
}
const doDrop = (e) => {
  e.preventDefault();
  const { files } = e.dataTransfer;
  const image = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e =>{
      previewImage.value = e.target.result;
  };
}
const doDownload = () => {
  if (!previewImage.value) {
    alertData.msg = 'Image belum di upload!'
    isOpen.value = true
  } else if (!(formInput.value.dear && formInput.value.message && formInput.value.from)) {
    alertData.msg = 'Form input belum lengkap!'
    isOpen.value = true
  }  else if (formInput.value.message.length > 65) {
    alertData.msg = 'Lebih baik huruf tidak lebih dari 65, karena akan terpotong!'
    isOpen.value = true
  } else {
    html2canvas(document.querySelector("#gift-card"))
      .then(canvas => {
        const image = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
        const link = document.createElement('a');
        link.href = image;
        link.download = 'CardGift.jpg';
        link.click();
      })
  }
}

</script>

<style scoped></style>
