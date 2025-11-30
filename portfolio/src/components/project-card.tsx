'use client'

import { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  link?: string
  tags?: string[]
}

interface CardTransform {
  rotateX: number
  rotateY: number
  scale: number
}

export function ProjectCard({ title, description, image, link, tags, people }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastMousePosition = useRef({ x: 0, y: 0 })

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
      card.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.2)'

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
      card.style.boxShadow = 'none'
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
    <Card ref={cardRef} className="overflow-hidden max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {tags && (
          <CardDescription className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </CardDescription>
        )}
        <div
          className="flex flex-wrap"
          title={(people > 1)
            ? `${people}` + ' people in the team'
            : 'solo project'
          }>
            {[...Array(people)].map((_, i) => (
              <FontAwesomeIcon icon={faUser} />
            ))}
        </div>
      </CardHeader>

      {image && (
        <img
          ref={imageRef}
          src={image}
          alt={title}
          className="h-60 w-[98%] object-cover rounded-md mx-auto"
        />
      )}

      <CardContent>
        <p className="mb-4 text-sm">{description}</p>
        {link && (
          <a href={link} className="text-sm underline" target="_blank" rel="noopener noreferrer">
            View Project →
          </a>
        )}
      </CardContent>
    </Card>
  )
}
