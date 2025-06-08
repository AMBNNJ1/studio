import { createClient } from '@supabase/supabase-js'
import { allModules } from '../src/lib/modules-data'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function run() {
  for (const module of allModules) {
    const { id, slug, title, level, description, imagePlaceholder, dataAiHint, quiz } = module
    const { error } = await supabase
      .from('modules')
      .upsert({ id, slug, title, level, description, imagePlaceholder, dataAiHint, quiz }, { onConflict: 'id' })
    if (error) console.error('module', slug, error.message)

    for (const lesson of module.lessons) {
      const filePath = path.join('src/content/modules', lesson.markdownPath ?? '')
      let content = null
      try {
        content = await fs.readFile(filePath, 'utf8')
      } catch {}
      const { error: lessonError } = await supabase
        .from('lessons')
        .upsert(
          {
            id: lesson.id,
            module_slug: slug,
            title: lesson.title,
            keyTakeaways: lesson.keyTakeaways,
            videoUrl: lesson.videoUrl,
            content
          },
          { onConflict: 'id,module_slug' }
        )
      if (lessonError) console.error('lesson', slug, lesson.id, lessonError.message)
    }
  }
  console.log('Seeding complete')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
