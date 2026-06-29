import HttpErrors from 'http-errors';
import {Posts, Users, Comments, Likes} from '../models/index.js';

export default {
  async create(req, res, next) {
    try {
      if (!req.file) {
        throw new HttpErrors(400, {
          errors: {
            message: 'Image is required',
          },
        });
      }

      const post = await Posts.create({
        image: `/media/${req.file.filename}`,
        caption: req.body.caption,
        userId: req.session.user.id,
      });

      res.status(200).json({
        message: 'Post successfully created!',
      });
    } catch (e) {
      next(e);
    }
  },

  async feed(req, res, next) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;

      const {rows, count} = await Posts.findAndCountAll({
        include: [
          {
            model: Users,
            as: 'author',
            attributes: ['id', 'username', 'avatar'],
          },

          {
            model: Comments,
            as: 'comments',
          },

          {
            model: Users,
            as: 'likedBy',
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset,
      });

      const posts = rows.map((post) => ({
        ...post.toJSON(),
        likesCount: post.likedBy.length,
      }));

      res.status(200).json({
        posts,
        pagination: {
          page,
          totalPages: Math.ceil(count / limit),
          totalResults: count,
        },
      });
    } catch (e) {
      next(e);
    }
  },

  async like(req, res, next) {
    try {
      const post = await Posts.findByPk(req.params.id);

      if (!post) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Posts not found',
          },
        });
      }

      const liked = await Likes.findOne({
        where: {
          userId: req.session.user.id,
          postId: post.id,
        },
      });

      if (liked) {
        await liked.destroy();
      } else {
        await Likes.create({
          userId: req.session.user.id,
          postId: post.id,
        });
      }

      const likesCount = await Likes.count({
        where: {
          postId: post.id,
        },
      });

      res.status(200).json({
        likesCount,
      });
    } catch (e) {
      next(e);
    }
  },

  async comment(req, res, next) {
    try {
      const post = await Posts.findByPk(req.params.id);

      if (!post) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Posts not found',
          },
        });
      }

      const comment = await Comments.create({
        text: req.body.text,
        userId: req.session.user.id,
        postId: post.id,
      });

      res.status(200).json({
        message: 'Comment successfully created!',
        comment,
      });
    } catch (e) {
      next(e);
    }
  },
}