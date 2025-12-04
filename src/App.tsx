import { Moon, SunMedium, Wand2 } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

function App() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const [status, setStatus] = useState('in-progress')
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/60 to-accent/10 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/70 px-6 py-4 shadow-lg shadow-black/5 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">shadcn/ui ready</p>
            <h1 className="text-3xl font-semibold leading-tight">Dashboard Demo</h1>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {resolvedTheme === 'dark' ? <Moon className="size-4" /> : <SunMedium className="size-4" />}
                  <span className="hidden sm:inline">
                    主题：
                    {theme}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>选择主题</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme('light')}>浅色</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>深色</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>跟随系统</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>快速切换</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-2" onClick={() => setOpenDialog(true)}>
              <Wand2 className="size-4" />
              打开对话框
            </Button>
          </div>
        </header>

        <main className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <Card className="shadow-xl shadow-black/5">
            <CardHeader>
              <CardTitle>任务表单</CardTitle>
              <CardDescription>演示 Input / Select / Textarea / Button 组合。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">标题</Label>
                <Input id="title" placeholder="给任务起个名字" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">状态</Label>
                <Select value={status} onValueChange={value => setStatus(value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">待办</SelectItem>
                    <SelectItem value="in-progress">进行中</SelectItem>
                    <SelectItem value="done">已完成</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desc">描述</Label>
                <Textarea id="desc" placeholder="补充任务细节..." rows={4} />
              </div>
              <div className="flex items-center gap-3">
                <Button type="button">提交</Button>
                <Button type="button" variant="secondary">
                  保存草稿
                </Button>
                <Button type="button" variant="ghost">
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Alert className="border-border/60">
              <AlertTitle>已加载组件</AlertTitle>
              <AlertDescription className="space-y-1 text-sm">
                <p>按钮、表单元素、Dropdown、Dialog、Card、Alert 已接入。</p>
                <p className="text-muted-foreground">
                  当前主题：
                  {resolvedTheme}
                  （设置：
                  {theme}
                  ）
                </p>
              </AlertDescription>
            </Alert>

            <Card className="shadow-xl shadow-black/5">
              <CardHeader>
                <CardTitle>交互提示</CardTitle>
                <CardDescription>尝试切换主题、打开对话框或修改表单。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  className={cn(
                    'rounded-lg border border-dashed border-border/70 p-4 text-sm',
                    resolvedTheme === 'dark' ? 'bg-muted/30' : 'bg-muted/60',
                  )}
                >
                  Tailwind v4 + shadcn/ui 样式由 `src/index.css` 提供；主题切换通过
                  `ThemeProvider` 操作 `document.documentElement` 的 `dark` class。
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => setTheme('light')}>
                    浅色
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setTheme('dark')}>
                    深色
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setTheme('system')}>
                    系统
                  </Button>
                  <Button size="sm" onClick={toggleTheme}>
                    快速切换
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Shadashboard</DialogTitle>
              <DialogDescription>这是一个使用 shadcn/ui 的示例对话框。</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>你可以在这里放置设置、确认提示或任意内容。</p>
              <p>主题切换会实时影响对话框的配色。</p>
            </div>
            <DialogFooter className="mt-4 flex gap-2">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                关闭
              </Button>
              <Button onClick={() => setOpenDialog(false)}>好的</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default App
