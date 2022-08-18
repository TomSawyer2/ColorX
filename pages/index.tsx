import './index.scss'
import primaryColors from '../assets/colors.json'
import VirtualScroll from '../components/VirtualScroll.vue'

interface ColorItem {
  CMYK: number[]
  RGB: number[]
  hex: string
  name: string
  pinyin: string
}

const shuffle = (arr: any[]) => {
  let i = arr.length
  while (i) {
    const j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default defineComponent({
  setup() {
    // const colors = shuffle(primaryColors);
    const colors = primaryColors
    const colorMap = ['#0093D3', '#CC006B', '#FFF10C', '#333']
    const currentColor = ref(
      colors.find((item) => item.pinyin === 'guibeihuang')
    )
    return () => (
      <div
        style={`background-color: ${currentColor.value.hex}`}
        class="color-container h-full">
        <header class="main-header">
          <div class="mx-auto flex h-full max-w-7xl items-center px-6">
            <span class="px-2 py-1 text-3xl">ColorX</span>
          </div>
        </header>
        <main class="main-content">
          <div class="color-list">
            <VirtualScroll length={colors.length / 6} childHeight={100}>
              <div class="grid h-10 grid-flow-row grid-cols-6 gap-y-4">
                {colors.map((colorItem: ColorItem) => (
                  <div
                    key={colorItem.hex}
                    class="color-item w-12"
                    style={`border-top: 8px solid ${colorItem.hex}`}
                    onClick={() => (currentColor.value = colorItem)}>
                    <div
                      class="color-item-top"
                      style={`color: ${colorItem.hex}`}>
                      <span>{colorItem.name}</span>
                      <div class="color-item-top-progress">
                        {colorItem.CMYK.map((cmyk: number, index: number) => (
                          <el-progress
                            type="dashboard"
                            percentage={cmyk}
                            width={22}
                            show-text={false}
                            class="color-item-top-progress-item"
                            indeterminate
                            key={index}
                          />
                        ))}
                      </div>
                    </div>
                    <div class="color-item-bottom">
                      <span>{colorItem.pinyin}</span>
                      <div class="divider" />
                      <span>{colorItem.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </VirtualScroll>
          </div>
          <div class="info mt-5 flex -translate-y-5 flex-row pr-40">
            <div class="info-rgb flex h-full flex-col justify-center">
              {currentColor.value.CMYK.map((cmyk: number, index: number) => (
                <>
                  <div class="divider_h" />
                  <el-progress
                    type="circle"
                    percentage={cmyk}
                    width={60}
                    class="info-rgb-item"
                    indeterminate
                    color={colorMap[index]}
                    stroke-width={3}>
                    <span class="innerText">{{ cmyk }}</span>
                  </el-progress>
                </>
              ))}
              <div class="divider_h" />
              <div class="rgb-box p-2">
                <span class="text-white">R</span>
                <span class="flex justify-end text-xl text-white">
                  {currentColor.value.RGB[0]}
                </span>
              </div>
              <div class="divider_h" />
              <div class="rgb-box p-2">
                <span class="text-white">G</span>
                <span class="flex justify-end text-xl text-white">
                  {currentColor.value.RGB[1]}
                </span>
              </div>
              <div class="divider_h" />
              <div class="rgb-box p-2">
                <span class="text-white">B</span>
                <span class="flex justify-end text-xl text-white">
                  {currentColor.value.RGB[2]}
                </span>
              </div>
              <div class="divider_h" />
            </div>
            <div class="main-title pl-20">
              <span class="">{currentColor.value.name}</span>
              <div class="sub-title">
                <span>{currentColor.value.pinyin}</span>
              </div>
              <div class="sub-title">
                <span>{currentColor.value.hex}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  },
})
