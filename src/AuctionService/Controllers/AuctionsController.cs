using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [ApiController]
    [Route("api/auctions")]
    public class Auctions : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public Auctions(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            this._context = context;
            this._mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
        {
            var query = _context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

            if (!string.IsNullOrEmpty(date))
            {
                query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
            }

            /**
            var auctions = await _context.Auctions
                    .Include(x => x.Item)
                    .OrderBy(x => x.Item.Make)
                    .ToListAsync();

            System.Console.WriteLine(auctions.Count());

            return _mapper.Map<List<AuctionDto>>(auctions);
            **/

            return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> getAuctionById(Guid id)
        {
            var auction = await _context.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            return _mapper.Map<AuctionDto>(auction);

        }

        [HttpPost]
        public async Task<ActionResult<Auction>> CreateAuction(CreateAuctionDto auctionDto)
        {
            var auction = _mapper.Map<Auction>(auctionDto);

            // TODO: Add current user as seller
            auction.Seller = "test";

            _context.Auctions.Add(auction);

            var newAuction = _mapper.Map<AuctionDto>(auction);

            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

            var results = await _context.SaveChangesAsync() > 0;

            if (!results) return BadRequest("Could not save an auction to the database");

            return CreatedAtAction(nameof(getAuctionById), new { auction.Id }, newAuction);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAction(Guid id, UpdateAuctionDto updateAuction) 
        {

            var auction = await _context.Auctions.Include(x => x.Item)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            // TODO: check seller === username 

            auction.Item.Make = updateAuction.Make ?? auction.Item.Make;
            auction.Item.Model = updateAuction.Model?? auction.Item.Model;
            auction.Item.Color = updateAuction.Color ?? auction.Item.Color;
            auction.Item.Year = updateAuction.Year ?? auction.Item.Year;
            auction.Item.Year = updateAuction.Mileage?? auction.Item.Mileage;

            // MAPPING PROFILES
            var auctionUpdated = _mapper.Map<AuctionUpdated>(auction);

            // PUBLLISHING
            await _publishEndpoint.Publish(auctionUpdated);

            var results = await _context.SaveChangesAsync() > 0;

            if (!results) return BadRequest("Bad request, something failed, try updating later!");

            return Ok();
        }

    }
}