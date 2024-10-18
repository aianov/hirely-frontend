import { CommentLikeOrDislikeType } from '@/stores/post/components/comment/types'
import { profileStore } from '@/stores/profile-store/profile-store'
import { toJS } from 'mobx'
import { nanoid } from 'nanoid'
import { Dispatch, SetStateAction } from 'react'
import { postFav, postLike, postLikeOrDisToCom } from '../api/posts/api'
import { createComment, getRepliesFromComment } from '../api/posts/comments/api'
import { CreateCommentBody } from '../api/posts/comments/types'

function memoizeFunction<T extends (...args: any[]) => ReturnType<T>>(
	fn: T,
	dependencies: any[] = []
): T {
	const memoizedFunctions = new Map<string, ReturnType<T>>()
	let lastDependencies: any[] = []

	return ((...args: Parameters<T>): ReturnType<T> => {
		const key = JSON.stringify(args)
		const dependenciesChanged = !areDependenciesEqual(dependencies, lastDependencies)
		if (dependenciesChanged) {
			memoizedFunctions.clear()
			lastDependencies = [...dependencies]
		}
		if (memoizedFunctions.has(key)) return memoizedFunctions.get(key) as ReturnType<T>
		const result = fn(...args)
		memoizedFunctions.set(key, result)
		return result
	}) as T
}

function areDependenciesEqual(dep1: any[], dep2: any[]): boolean {
	if (dep1.length !== dep2.length) return false
	for (let i = 0; i < dep1.length; i++) if (dep1[i] !== dep2[i]) return false
	return true
}

export const postComLikeOrDislike = async (
	commentId: number,
	type: CommentLikeOrDislikeType,
	isLikeOrDis: boolean,
	setIsLikOrDis: Dispatch<SetStateAction<boolean>>,
	isComLike: boolean,
	isComDislike: boolean,
	setComLikes: Dispatch<SetStateAction<number>>,
	setIsComLike: Dispatch<SetStateAction<boolean>>,
	setComDislikes: Dispatch<SetStateAction<number>>,
	setIsComDislike: Dispatch<SetStateAction<boolean>>,
) => {
	if ((isComLike && type === 'Like') || (isComDislike && type === 'Dislike') || isLikeOrDis) return
	setIsLikOrDis(true)

	const ifError = () => {
		if (type === 'Like') {
			setComLikes(prev => prev - 1)
			setIsComLike(prev => !prev)
			if (isComDislike) setComLikes(prev => prev + 1)
		} else {
			setIsComDislike(prev => !prev)
			setComDislikes(prev => prev - 1)
			if (isComLike) setComLikes(prev => prev + 1)
		}
	}

	if (type === 'Like') {
		if (isComLike) return
		setComLikes(prev => prev + 1)
		if (isComDislike) {
			setIsComLike(prev => !prev)
			setIsComDislike(prev => !prev)
			setComDislikes(prev => prev - 1)
		} else {
			setIsComLike(prev => !prev)
		}
	}

	if (type === 'Dislike') {
		if (isComDislike) return
		setComDislikes(prev => prev + 1)
		if (isComLike) {
			setIsComLike(prev => !prev)
			setIsComDislike(prev => !prev)
			setComLikes(prev => prev - 1)
		}
		else setIsComDislike(prev => !prev)
	}

	try {
		const res = await postLikeOrDisToCom(commentId, type)
		if (res == undefined) {
			ifError()
			return
		}
	} catch (err) {
		console.log(err)
		ifError()
	} finally { setIsLikOrDis(false) }
}

export const createReplyToCommentHandler = memoizeFunction(async (
	postId: number,
	body: CreateCommentBody,
	to: string,
	userId: string,
	setCommentCount: Dispatch<SetStateAction<number>>,
	setIsCommentDisabled: Dispatch<SetStateAction<boolean>>,
	setComments: Dispatch<SetStateAction<number>>,
	setIsReply: Dispatch<SetStateAction<boolean>>,
	setChildCommentsList: Dispatch<SetStateAction<never[]>>,
) => {
	if (body.content === '') return
	const { profile } = profileStore
	setIsCommentDisabled(true)
	const tempId = nanoid()
	const fakeComment = {
		id: tempId,
		content: body.content,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		postId,
		authorId: profile.id,
		parentId: body.parentId,
		repliesCount: 0,
		likesCount: 0,
		dislikesCount: 0,
		userLiked: false,
		userDisliked: false,
		author: toJS(profile),
		addressedTo: { name: to, userId: userId },
		addressedToName: to,
		addressedToTag: userId
	}
	// @ts-ignore
	setChildCommentsList(prev => [fakeComment, ...prev])
	setComments(prev => prev + 1)
	setCommentCount(prev => prev + 1)
	setIsReply(false)

	const ifError = () => {
		// @ts-ignore
		setChildCommentsList(prev => prev.filter(comment => comment.id !== tempId))
		setComments(prev => prev - 1)
		setCommentCount(prev => prev - 1)
	}
	try {
		const res = await createComment(postId, body)
		if (res?.status === 201 && res?.data?.res) {
			let newComment = res.data.res
			// @ts-ignore
			setChildCommentsList(prev => prev.map(comment => comment.id === tempId ? { ...newComment } : comment))
		}
		else ifError()
	} catch (err) {
		console.log(err)
		ifError()
	}
	finally { setIsCommentDisabled(false) }
})

export const createReplyToChildCommentHandler = memoizeFunction(async (
	postId: number,
	body: CreateCommentBody,
	to: string,
	userId: string,
	setAllCommentCount: Dispatch<SetStateAction<number>>,
	setParentCommentCount: Dispatch<SetStateAction<number>>,
	setReplyedCommentCount: Dispatch<SetStateAction<number>>,
	setIsCommentDisabled: Dispatch<SetStateAction<boolean>>,
	setIsReply: Dispatch<SetStateAction<boolean>>,
	setChildCommentsList: Dispatch<SetStateAction<never[]>>,
) => {
	if (body.content === '') return
	const { profile } = profileStore
	setIsCommentDisabled(true)
	const tempId = nanoid()
	const fakeComment = {
		id: tempId,
		content: body.content,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		postId,
		authorId: profile.id,
		parentId: body.parentId,
		repliesCount: 0,
		likesCount: 0,
		dislikesCount: 0,
		userLiked: false,
		userDisliked: false,
		author: toJS(profile),
		addressedTo: { name: to, userId: userId },
		addressedToName: to,
		addressedToTag: userId
	}
	// @ts-ignore
	setChildCommentsList(prev => [...prev, fakeComment])

	setParentCommentCount(prev => prev + 1)
	setAllCommentCount(prev => prev + 1)
	setReplyedCommentCount(prev => prev + 1)

	setIsReply(false)
	const ifError = () => {
		// @ts-ignore
		setChildCommentsList(prev => prev.filter(comment => comment.id !== tempId))
		setParentCommentCount(prev => prev - 1)
		setAllCommentCount(prev => prev - 1)
		setReplyedCommentCount(prev => prev - 1)
	}
	try {
		const res = await createComment(postId, body)
		if (res?.status === 201 && res?.data?.res) {
			let newComment = res.data.res
			// @ts-ignore
			setChildCommentsList(prev => prev.map(comment => comment.id === tempId ? { ...newComment } : comment))
		}
		else ifError()
	} catch (err) {
		console.log(err)
		ifError()
	}
	finally { setIsCommentDisabled(false) }
})

export const getChildCommentsHandler = memoizeFunction(async (
	commentId: number,
	page: number,
	loading: boolean,
	setLoading: Dispatch<SetStateAction<boolean>>,
	setChildCommentsStaticLength: Dispatch<SetStateAction<number>>,
	setChildCommentsList: Dispatch<SetStateAction<never[]>>
) => {
	if (loading) return
	setLoading(true)
	try {
		const res = await getRepliesFromComment(commentId, page)
		setChildCommentsStaticLength(prev => prev + res?.data?.replies?.length)
		// @ts-ignore
		setChildCommentsList(prev => [...prev, ...res?.data?.replies])
	} catch (err) { console.log(err) }
	finally { setLoading(false) }
})

export const createMainCommentHandler = memoizeFunction(async (
	postId: number,
	body: CreateCommentBody,
	setComments: Dispatch<SetStateAction<number>>,
	setIsCommentDisabled: Dispatch<SetStateAction<boolean>>,
	setComment: Dispatch<SetStateAction<string>>,
	setYourPreviewComments: Dispatch<SetStateAction<never[]>>,
) => {
	if (body.content === '') return
	const { profile } = profileStore
	const tempId = nanoid()
	const fakeComment = {
		id: tempId,
		content: body.content,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		postId,
		authorId: profile.id,
		parentId: body.parentId,
		repliesCount: 0,
		likesCount: 0,
		dislikesCount: 0,
		userLiked: false,
		userDisliked: false,
		author: toJS(profile)
	}

	// @ts-ignore
	setYourPreviewComments(prev => [fakeComment, ...prev])
	setIsCommentDisabled(true)
	setComments(prev => prev + 1)

	const ifError = () => {
		// @ts-ignore
		setYourPreviewComments(prev => prev.filter(comment => comment.id !== tempId))
		setComments(prev => prev - 1)
	}

	try {
		const res = await createComment(postId, body)
		if (res?.data?.res) {
			const newComment = res.data.res
			// @ts-ignore
			setYourPreviewComments(prev => prev.map(comment => comment.id === tempId ? { ...newComment } : comment))
			setComment('')
		}
		else ifError()
	} catch (err) {
		console.log(err)
		ifError()
	}
	finally { setIsCommentDisabled(false) }
})

export const postFavHandler = async (
	postId: number,
	isFaving: boolean,
	setIsFaving: Dispatch<SetStateAction<boolean>>,
	isFav: boolean,
	setIsFav: Dispatch<SetStateAction<boolean>>,
	setFavs: Dispatch<SetStateAction<number>>,
) => {
	if (isFaving) return
	setIsFaving(true)

	setIsFav((prev: boolean) => !prev)
	isFav ? setFavs(prev => prev - 1) : setFavs(prev => prev + 1)

	const ifError = () => {
		isFav ? setFavs(prev => prev + 1) : setFavs(prev => prev - 1)
		setIsFav((prev: boolean) => !prev)
	}

	try {
		const res = await postFav(postId)
		if (res == undefined) ifError()
	} catch (err) {
		console.log(err)
		ifError()
	}
	finally { setIsFaving(false) }
}

export const postLikeHandler = async (
	postId: number,
	isLiking: boolean,
	setIsLiking: Dispatch<SetStateAction<boolean>>,
	isLiked: boolean,
	setIsLiked: Dispatch<SetStateAction<boolean>>,
	setLikes: Dispatch<SetStateAction<number>>,
) => {
	if (isLiking) return

	setIsLiking(true)
	isLiked ? setLikes(prev => prev - 1) : setLikes(prev => prev + 1)
	setIsLiked((prev: boolean) => !prev)

	const ifError = () => {
		isLiked ? setLikes(prev => prev + 1) : setLikes(prev => prev - 1)
		setIsLiked((prev: boolean) => !prev)
	}

	try {
		const res = await postLike(postId)
		if (res == undefined) ifError()
	} catch (err) {
		ifError()
		console.log(err)
	}
	finally { setIsLiking(false) }
}