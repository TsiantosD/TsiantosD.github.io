'use client'

import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  image?: string|null;
  tags?: string[];
  people?: number|null;
  scrollId?: string;
}

interface CardTransform {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function CourseCard({ slug, title, description, image, tags, people = null, scrollId }: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`/course/${slug}${scrollId ? `#${scrollId}` : ''}`);
  }, []);

  useEffect(() => {
    const card = cardRef.current
    const img = imageRef.current
    if (!card || !img) return

    let rect: DOMRect
    let centerX: number
    let centerY: number

    const updateCardTransform = (mouseX: number, mouseY: number) => {
      if (!rect) {
        rect = card.getBoundingClientRect()
        centerX = rect.left + rect.width / 2
        centerY = rect.top + rect.height / 2
      }

      const relativeX = mouseX - centerX
      const relativeY = mouseY - centerY

      const cardTransform: CardTransform = {
        rotateX: -relativeY * 0.005,
        rotateY: relativeX * 0.005,
        scale: 1.025
      }

      const imageTransform: CardTransform = {
        rotateX: -relativeY * 0.001,
        rotateY: relativeX * 0.001,
        scale: 1.05
      }

      return { cardTransform, imageTransform }
    }

    const animate = () => {
      const { cardTransform, imageTransform } = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y
      )

      card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`

      img.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'
      img.style.transition = 'transform 0.2s ease'
      animate()
    }

    const handleMouseLeave = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)

      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'

      img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      img.style.transition = 'transform 0.5s ease'
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Card ref={cardRef} className="flex flex-col h-full overflow-hidden border-none shadow-md transition-all">
      {image && (
        <a href={url} className="block aspect-video overflow-hidden">
          <img
            ref={imageRef}
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
        </a>
      )}

      <CardHeader className="space-y-2 flex-none">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <div className="flex items-center justify-between">
          {tags && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {people != null && people > 0 && (
            <div className="flex gap-0.5 text-muted-foreground">
              {[...Array(people)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faUser} className="text-[10px]" />
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        <div className="mt-auto">
          {slug && (
            <a href={url} className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
              Learn more <span className="text-xs">→</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
