import { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Stage, Layer, Line } from 'react-konva'
import s from './ImageEditor.module.scss'
import { Modal, Slider } from 'antd'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/stores/theme/theme-store'

export const ImageEditor = observer(() => {
   const { currentTheme } = themeStore

   const { selectedImage, setSelectedImage, setMessageFile, messageFile, saveSketch, loadSketch, undoSketch, redoSketch } = messageStore

   const [editorScale, setEditorScale] = useState(1)
   const [editorRotate, setEditorRotate] = useState(0)
   const [lines, setLines] = useState([])
   const [isDrawing, setIsDrawing] = useState(false)
   const [color, setColor] = useState('red')
   const [brushSize, setBrushSize] = useState(5)
   const [imageDimensions, setImageDimensions] = useState({ width: 400, height: 450 })
   const editorRef = useRef(null)
   const stageRef = useRef(null)

   const handleImageLoad = (url: string) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
         const aspectRatio = img.width / img.height
         let newWidth = 400
         let newHeight = 450

         if (aspectRatio > 1) {
            newHeight = newWidth / aspectRatio
         } else {
            newWidth = newHeight * aspectRatio
         }

         setImageDimensions({ width: newWidth, height: newHeight })
      }
   }

   const handleSave = async () => {
      if (editorRef.current && stageRef.current) {
         const editorCanvas = editorRef.current.getImage().toDataURL()
         const stageCanvas = stageRef.current.toDataURL()
         const finalCanvas = document.createElement('canvas')
         const ctx = finalCanvas.getContext('2d')

         const img1 = new Image()
         const img2 = new Image()

         img1.src = editorCanvas
         img2.src = stageCanvas

         img1.onload = () => {
            finalCanvas.width = img1.width
            finalCanvas.height = img1.height
            ctx.drawImage(img1, 0, 0)
            img2.onload = () => {
               ctx.drawImage(img2, 0, 0)
               const finalImageDataURL = finalCanvas.toDataURL()

               // Convert DataURL to File
               const dataURLToFile = (dataURL: string, filename: string): File => {
                  const [header, data] = dataURL.split(',')
                  const mime = header.match(/:(.*?);/)?.[1] || 'application/octet-stream'
                  const binary = atob(data)
                  const array = new Uint8Array(binary.length)
                  for (let i = 0; i < binary.length; i++) {
                     array[i] = binary.charCodeAt(i)
                  }
                  return new File([array], filename, { type: mime })
               }

               const newFile = dataURLToFile(finalImageDataURL, selectedImage?.fileName || 'edited-image.png')

               // Update the messageFile array in messageStore
               const updatedFiles = messageFile.map(file => {
                  if (selectedImage && file.name === selectedImage.fileName) {
                     return newFile
                  }
                  return file
               })

               setMessageFile(updatedFiles) // Ensure this correctly updates the store

               // Save the sketch associated with the file
               if (selectedImage) {
                  saveSketch(selectedImage.fileName || '', lines)
               }

               // Clear selected image
               setSelectedImage(null)

               console.log('Image updated successfully!')
            }
         }
      }
   }

   useEffect(() => {
      if (selectedImage) {
         handleImageLoad(selectedImage.url)
         const sketch = loadSketch(selectedImage.fileName || '')
         setLines(sketch.lines)
      }
   }, [selectedImage])

   const handleMouseDown = () => {
      setIsDrawing(true)
      const pos = stageRef.current.getPointerPosition()
      setLines([...lines, { points: [pos.x, pos.y], color, brushSize }])
   }

   const handleMouseMove = () => {
      if (!isDrawing) return
      const stage = stageRef.current
      const point = stage.getPointerPosition()
      const lastLine = lines[lines.length - 1]
      lastLine.points = lastLine.points.concat([point.x, point.y])
      setLines([...lines.slice(0, lines.length - 1), lastLine])
   }

   const handleMouseUp = () => {
      setIsDrawing(false)
   }

   return (
      <Modal
         open={selectedImage !== null}
         onCancel={() => {
            setSelectedImage(null)
         }}
         footer={<></>}
         centered
         className={`${s.modal} modal-without-close modal-without-padding`}
      >
         <div className={s.main} style={{ position: 'relative' }}>
            <div className={s.top}>
               <span className={s.toptitle}>Редактор изображений</span>
            </div>
            {selectedImage && (
               <>
                  <div className={s.mid}>
                     <div className={s.midimgcontainer}>
                        <span
                           className={s.midtext}
                           style={currentTheme.secondTextColor}
                        >
                           Предпросмотр
                        </span>
                        <div
                           className={`${s.midimg} df jcc aic w100`}
                           style={currentTheme.btnsTheme}
                        >
                           <AvatarEditor
                              ref={editorRef}
                              image={selectedImage.url}
                              border={0}
                              scale={editorScale}
                              rotate={editorRotate}
                              className={s.imgeditor}
                              borderRadius={0}
                              width={imageDimensions.width}
                              height={imageDimensions.height}
                           />
                        </div>
                        <Stage
                           width={imageDimensions.width}
                           height={imageDimensions.height}
                           onMouseDown={handleMouseDown}
                           onMousemove={handleMouseMove}
                           onMouseup={handleMouseUp}
                           onTouchStart={handleMouseDown}
                           onTouchMove={handleMouseMove}
                           onTouchEnd={handleMouseUp}
                           ref={stageRef}
                           className={s.draweditor}
                           style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              zIndex: '11',
                           }}
                        >
                           <Layer>
                              {lines.map((line, i) => (
                                 <Line
                                    key={i}
                                    points={line.points}
                                    stroke={line.color}
                                    strokeWidth={line.brushSize}
                                    tension={0.5}
                                    lineCap="round"
                                    lineJoin="round"
                                 />
                              ))}
                           </Layer>
                        </Stage>
                     </div>

                     {/* =========================== REDACTIROVANIE ============================== */}
                     <div className={s.editbtns}>
                        <span
                           className={s.midtext}
                           style={currentTheme.secondTextColor}
                        >
                           Редактирование
                        </span>
                        <div className={s.topbtns}>

                           {/* РАЗМЕР КИСТИ */}
                           <div
                              className={s.editbtn}
                           >
                              <div className={s.editbtntop}>
                                 <span
                                    style={currentTheme.textColor}
                                    className={s.editbtntoplefttext}
                                 >
                                    Размер кисти
                                 </span>
                                 <span
                                    style={currentTheme.secondTextColor}
                                    className={s.editbtntoprighttext}
                                 >
                                    50%
                                 </span>
                              </div>
                              <div className={s.editbtnbot}>
                                 <Slider defaultValue={30} className='slider-antd' />
                              </div>
                           </div>

                           {/* ПОВОРОТ */}
                           <div
                              className={s.editbtn}
                           >
                              <div className={s.editbtntop}>
                                 <span
                                    style={currentTheme.textColor}
                                    className={s.editbtntoplefttext}
                                 >
                                    Поворот
                                 </span>
                                 <span
                                    style={currentTheme.secondTextColor}
                                    className={s.editbtntoprighttext}
                                 >
                                    50%
                                 </span>
                              </div>
                              <div className={s.editbtnbot}>
                                 <Slider
                                    value={editorRotate}
                                    onChange={(e) => setEditorRotate(e)}
                                    max={360}
                                    className='slider-antd'
                                 />
                              </div>
                           </div>

                           {/* ЦВЕТ */}
                           <div
                              className={s.editbtn}
                           >
                              <div className={s.editbtntop}>
                                 <span
                                    style={currentTheme.textColor}
                                    className={s.editbtntoplefttext}
                                 >
                                    Цвет
                                 </span>
                                 <span
                                    style={currentTheme.secondTextColor}
                                    className={s.editbtntoprighttext}
                                 >
                                    50%
                                 </span>
                              </div>
                              <div className={s.editbtnbot}>
                                 <Slider defaultValue={30} className='slider-antd' />
                              </div>
                           </div>
                        </div>
                        <div className={s.botbtns}>

                        </div>
                     </div>

                  </div>
                  <div>
                     <label>
                        Scale:
                        <input
                           type="range"
                           min="1"
                           max="3"
                           step="0.1"
                           value={editorScale}
                           onChange={(e) => setEditorScale(parseFloat(e.target.value))}
                        />
                     </label>
                     <label>
                        Rotate:
                        <input
                           type="number"
                           value={editorRotate}
                           onChange={(e) => setEditorRotate(parseFloat(e.target.value))}
                        />
                     </label>
                     <label>
                        Color:
                        <input
                           type="color"
                           value={color}
                           onChange={(e) => setColor(e.target.value)}
                        />
                     </label>
                     <label>
                        Brush Size:
                        <input
                           type="range"
                           min="1"
                           max="50"
                           step="1"
                           value={brushSize}
                           onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        />
                     </label>
                     <button onClick={() => setLines(undoSketch(selectedImage?.fileName || ''))}>Undo</button>
                     <button onClick={() => setLines(redoSketch(selectedImage?.fileName || ''))}>Redo</button>
                     <button onClick={handleSave}>Save</button>
                  </div>
               </>
            )}
         </div>
      </Modal>
   )
})
