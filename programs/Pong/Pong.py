
import pygame
from pygame.locals import *
from sys import exit

from random import randint
from random import random
from math import sqrt

pygame.init()

### START GLOBAL CONSTANTS ###
WHITE = (255,255,255)
GRAY  = (155,155,155)
BLACK = (0,0,0)

SCREEN_WIDTH  = 660
SCREEN_HEIGHT = 500

PADDLE_HEIGHT = 80
PADDLE_WIDTH  = 8
PADDLE_COLOR  = WHITE

BALL_WIDTH  = 8
BALL_HEIGHT = 8
BALL_COLOR  = WHITE

BACKGROUND_COLOR = BLACK
FIELD_WIDTH      = 640
FIELD_HEIGHT     = 480
FIELD_BORDER_INSET = 16
FIELD_BORDER_WIDTH = 2
BORDER_COLOR     = WHITE


POINTS_TO_WIN    = 10

BALL_RESET_X     = FIELD_WIDTH/2  - BALL_WIDTH/2
BALL_RESET_Y     = FIELD_HEIGHT/2 - BALL_HEIGHT/2

PADDLE_START_Y   = 215
PADDLE_L_START_X = FIELD_BORDER_INSET + PADDLE_WIDTH
PADDLE_R_START_X = FIELD_WIDTH - FIELD_BORDER_INSET

FONT_SIZE        = 40
SCORE_COLOR      = GRAY
SCORE_Y          = 4 + FIELD_BORDER_INSET
L_SCORE_X        = SCREEN_WIDTH * 1/3.0
R_SCORE_X        = SCREEN_WIDTH - SCREEN_WIDTH * 1/3.0

STANDARD_PADDLE_SPEED   = 320.
STANDARD_BALL_MAX_SPEED = 360.

MAX_BALLS = 5

### END GLOBAL CONSTANTS ###
### START GAME OBJECTS ###

class Ball():
    def __init__(self):
        self.xVel, self.yVel = 0, 0
        
        self.maxSpeed = STANDARD_BALL_MAX_SPEED
        self.color = BALL_COLOR
        self.width = BALL_WIDTH
        self.height = BALL_HEIGHT

        self.surface = pygame.Surface((BALL_WIDTH,BALL_HEIGHT))
        self.surface.convert()
        self.surface.fill(self.color)
        self.rect    = pygame.Rect(0,0,BALL_WIDTH,BALL_HEIGHT)

        self.x, self.y = BALL_RESET_X, BALL_RESET_Y
        
    def reset(self):
        self.x, self.y = BALL_RESET_X, BALL_RESET_Y
        self.xVel, self.yVel = 0,0
        
    def serve(self):
        self.xVel = self.maxSpeed * random()
        if self.xVel < self.maxSpeed/2:
            self.xVel = self.maxSpeed/2

        self.yVel = sqrt((self.maxSpeed * self.maxSpeed) - (self.xVel * self.xVel)) * random()
        if self.yVel <= 1:
            self.yVel = 1
        
        if random() > 0.5:
            self.xVel *= -1
        if random() > 0.5:
            self.yVel *= -1

    def flipXvel(self):
        self.xVel = -self.xVel
    def flipYvel(self):
        self.yVel = -self.yVel

class Paddle():
    def __init__(self, x):
        
        self.x, self.y = x, PADDLE_START_Y
        self.maxSpeed = STANDARD_PADDLE_SPEED
        self.vel   = 0.0
        self.width = PADDLE_WIDTH
        self.height = PADDLE_HEIGHT
        self.color = PADDLE_COLOR

        self.accelerationSteps = 4

        self.surface = pygame.Surface((PADDLE_WIDTH,PADDLE_HEIGHT))
        self.surface.convert()
        self.surface.fill(PADDLE_COLOR)

    def contains(self, other):
        if other.x >= self.x and other.x <= self.x + self.width and other.y >= self.y and other.y <= self.y + self.height :
            return True
        elif other.x + other.width >= self.x and other.x + other.width <= self.x + self.width and other.y + other.height >= self.y and other.y + other.height <= self.y + self.height :
            return True

    def strikeBall(self, ball):
        
        ball.flipXvel()
        ball.xVel *= 1.078

        if self._isMovingUp():
            ball.yVel *= (1.078)
        elif self._isMovingDown():
            ball.yVel *= (1.078)
            
    def moveDown(self):
        self._moveDown(self.maxSpeed)
        #self._moveDown(self.maxSpeed / self.accelerationSteps)
    def moveUp(self):
        self._moveUp(self.maxSpeed)
        #self._moveUp(self.maxSpeed / self.accelerationSteps)
        
    def halt(self):
        self.vel = 0
    def _moveUp(self, amount):
        self.vel -= amount
        if self.vel < -self.maxSpeed:
            self.vel = -self.maxSpeed
    def _moveDown(self, amount):
        self.vel += amount
        if self.vel > self.maxSpeed:
            self.vel = self.maxSpeed
    def _isMovingUp(self):
        return self.vel < 0
    def _isMovingDown(self):
        return self.vel > 0
    def _isHalted(self):
        return self.vel == 0

    def growthPowerup(self):
        if self.height == PADDLE_HEIGHT:
            self.y -= PADDLE_HEIGHT/4
            self.height = PADDLE_HEIGHT * (3/2)
            self.maxSpeed = STANDARD_PADDLE_SPEED/2
            self._adjustSurface()

    def undoGrowth(self):
        if self.height == PADDLE_HEIGHT * (3/2):
            self.y += PADDLE_HEIGHT/4
            self.height = PADDLE_HEIGHT
            self.maxSpeed = STANDARD_PADDLE_SPEED
            self._adjustSurface()

    def _adjustSurface(self):
        self.surface = pygame.Surface((PADDLE_WIDTH,self.height))
        self.surface.convert()
        self.surface.fill(PADDLE_COLOR)

class Court():
    def __init__(self):

        self.fullX      = 0
        self.fullY      = 0
        self.fullWidth  = FIELD_WIDTH
        self.fullHeight = FIELD_HEIGHT
        
        self.x = FIELD_BORDER_INSET
        self.y = FIELD_BORDER_INSET
        self.width  = FIELD_WIDTH - FIELD_BORDER_INSET*2
        self.height = FIELD_HEIGHT - FIELD_BORDER_INSET*2
        self.floorColor = BLACK
        self.borderColor = WHITE
        self.borderWidth = FIELD_BORDER_WIDTH

        self.floorSurface = pygame.Surface((self.fullWidth,self.fullHeight))
        self.floor = self.floorSurface.convert()
        self.floor.fill(self.floorColor)
        
    def contains(self, other):
        if other.x >= self.x and other.x <= self.x + self.width or other.y >= self.y and other.y <= self.y + self.height :
            return True
        elif other.x + other.width >= self.x and other.x + other.width <= self.x + self.width or other.y + other.height >= self.y and other.y + other.height <= self.y + self.height :
            return True

    def keepPaddleInBounds(self, paddle):
        if paddle.y + paddle.height < 0:
            paddle.y = self.fullHeight
        elif paddle.y > self.fullHeight:
            paddle.y = -paddle.height
            
    def keepBallInBounds(self, ball):
        if ball.y < self.y:
            ball.y = self.y
            ball.flipYvel()
        elif ball.y > self.height + FIELD_BORDER_INSET:
            ball.y = self.height  + FIELD_BORDER_INSET
            ball.flipYvel()

### END GAME OBJECTS ###
###########################################################################################################################################
        
class Pong():
    def __init__(self):
        
        self.screen=pygame.display.set_mode((SCREEN_WIDTH,SCREEN_HEIGHT),0,32)
        pygame.display.set_caption("Pong")

        self.clock = pygame.time.Clock()
        self.font  = pygame.font.SysFont("monospace",FONT_SIZE)

        self.splashScreen()
        
        ### LOAD ###
        self.court = Court()

        self.ball = Ball()
        self.ballList = []
        self.ballList.append(self.ball)
        
        self.paddleL = Paddle(PADDLE_L_START_X)
        self.paddleR = Paddle(PADDLE_R_START_X)

        self.L_score, self.R_score = 0,0

        ### END LOAD ###
        pygame.time.wait(2000)        

        self.ball.serve()

    def play(self):
        self._gameLoop()
        #self._promptReplay()

    def _isWinConditionMet(self):
        return self.L_score >= POINTS_TO_WIN or self.R_score >= POINTS_TO_WIN
    def _gameLoop(self):
        while not self._isWinConditionMet():
            self._render()
            self._updatePaddleSpeedBasedOnUserInput()
            self._updateMovement()
            self._checkCollisions()
            self._checkScored()
        self._displayWinner()
        
    def _render(self):

        self.screen.blit(self.court.floor,(0,0))
        frame = pygame.draw.rect(self.screen,self.court.borderColor, Rect((self.court.x,self.court.y),(self.court.x+self.court.width,self.court.y+self.court.height)), self.court.borderWidth)
        
        self.screen.blit(self.paddleL.surface,(self.paddleL.x,self.paddleL.y))
        self.screen.blit(self.paddleR.surface,(self.paddleR.x,self.paddleR.y))

        for ball in self.ballList:
            self.screen.blit(ball.surface,(ball.x,ball.y))

        scoreL = self.font.render(str(self.L_score), True, SCORE_COLOR)
        scoreR = self.font.render(str(self.R_score), True, SCORE_COLOR)
        self.screen.blit(scoreL,(L_SCORE_X,SCORE_Y))
        self.screen.blit(scoreR,(R_SCORE_X,SCORE_Y))
        
        pygame.display.update()

    def _checkCollisions(self):

        self.court.keepPaddleInBounds(self.paddleL)
        self.court.keepPaddleInBounds(self.paddleR)

        for ball in self.ballList:
            if self.paddleL.contains(ball):
                self.paddleL.strikeBall(ball)
            elif self.paddleR.contains(ball):
                self.paddleR.strikeBall(ball)
                
            self.court.keepBallInBounds(ball)

    def _checkScored(self):

        for ball in self.ballList:
            if ball.x <= self.court.x:
                self.R_score += 1
                self._resetBall(ball)
                self._serveBall(ball)
            elif ball.x >= self.court.fullWidth:
                self.L_score += 1
                self._resetBall(ball)
                self._serveBall(ball)

    def _updateMovement(self):
        
        time_passed = self.clock.tick(30)
        time_sec = time_passed / 1000.0

        for ball in self.ballList:
            ball.x += ball.xVel * time_sec
            ball.y += ball.yVel * time_sec

        self.paddleL.y += self.paddleL.vel * time_sec
        self.paddleR.y += self.paddleR.vel * time_sec
        
    def _updatePaddleSpeedBasedOnUserInput(self):
        for event in pygame.event.get():
            if event.type == QUIT:
                exit()

            if event.type == KEYUP:
                if event.key == K_UP:
                    self.paddleR.halt()
                elif event.key == K_DOWN:
                    self.paddleR.halt()
                    
                if event.key == K_w:
                    self.paddleL.halt()
                elif event.key == K_s:
                    self.paddleL.halt()
                    
            if event.type == KEYDOWN:
                if event.key == K_UP:
                    self.paddleR.moveUp()
                if event.key == K_DOWN:
                    self.paddleR.moveDown()

                if event.key == K_w:
                    self.paddleL.moveUp()
                if event.key == K_s:
                    self.paddleL.moveDown()

                if event.key == K_SPACE:
                    self._createNewBallAndServe()

                if event.key == K_RIGHT:
                    self.paddleR.growthPowerup()
                elif event.key == K_LEFT:
                    self.paddleR.undoGrowth()
                if event.key == K_d:
                    self.paddleL.growthPowerup()
                if event.key == K_a:
                    self.paddleL.undoGrowth()

    def _createNewBallAndServe(self):
        if len(self.ballList) < MAX_BALLS:
            ball = Ball()
            self._serveBall(ball)
            self.ballList.append(ball)

    def _resetBall(self, ball):
        ball.reset()
        self.court.borderColor  = self.randomPastelGenerator()
        
        return
    
    def _serveBall(self, ball):
        ball.serve()
        return
    def _displayWinner(self):

        self._render()
        
        if self.L_score > self.R_score:
            winner = self.font.render("Left Player Wins!", True, SCORE_COLOR)
            self.screen.blit(winner,(130,SCREEN_HEIGHT/2))
        else:
            winner = self.font.render("Right Player Wins!", True, SCORE_COLOR)
            self.screen.blit(winner,(130,SCREEN_HEIGHT/2))

        pygame.display.update()
        
    def _promptReplay(self):
        if True:
            self._resetScores()
            self.play()
        return
    def _resetScores(self):
        self.paddleL_score, self.paddleR_score = 0,0

    """ Returns a random color and it's compliment"""
    def randomColorGenerator(self):
        r = random() * 254 + 1
        g = random() * 254 + 1
        b = random() * 254 + 1
        
        return (r,g,b) , (255 - r, 255 - g, 255 - b)
    
    def randomPastelGenerator(self):
        r = random() * 127 + 127
        g = random() * 127 + 127
        b = random() * 127 + 127
        
        return (r,g,b)

    def splashScreen(self):

        backSurf = pygame.Surface((SCREEN_WIDTH,SCREEN_HEIGHT))
        back = backSurf.convert()
        back.fill(BLACK)
        self.screen.blit(back,(0,0))
        self.screen.blit(self.font.render("PONG", True, SCORE_COLOR),(SCREEN_WIDTH/2 - 45, SCREEN_HEIGHT/2 - 45))

        pygame.display.update()
        return
###########################################################################################################################################

if __name__ == "__main__":
    pongGame = Pong()
    pongGame.play()
