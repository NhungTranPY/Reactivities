using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //IRequest la type of Query dc dinh nghia trong Mediator (no la Mediator Interface)
        //and we need to tell this what we want to return from our query => o day la list of Activitiy
        public class Query : IRequest<List<Activity>> { }

        //parameter is query va what we want to return: List of Activity
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {

                var activities = await _context.Activities.ToListAsync();

                return activities;
            }
        }
    }
}